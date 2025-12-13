const fs = require('fs');
const path = require('path');

function walk(dir){
  let results = [];
  fs.readdirSync(dir).forEach(f=>{
    const p = path.join(dir,f);
    const stat = fs.statSync(p);
    if(stat && stat.isDirectory()) results = results.concat(walk(p));
    else results.push(p);
  });
  return results;
}

const root = path.join(__dirname,'..','docs','30_画面イメージ');
const files = walk(root).filter(p => p.endsWith('.html') || p.endsWith('.css'));
console.log('Processing', files.length, 'files');

files.forEach(file => {
  let s = fs.readFileSync(file,'utf8');
  let orig = s;

  if(file.endsWith('.html')){
    // remove Google Fonts preconnect/link lines
    s = s.replace(/<link[^>]+fonts\.googleapis\.com[^>]*>\s*/g, match => `<!-- ${match.trim()} -->\n`);
    s = s.replace(/<link[^>]+fonts\.gstatic\.com[^>]*>\s*/g, match => `<!-- ${match.trim()} -->\n`);

    // Replace spans like: <span class="material-symbols-outlined text-[20px] mr-1">check_circle</span>
    s = s.replace(/<span\s+class="([^"]*?)material-symbols-outlined([^"]*?)"(?:\s*style="([^"]*)")?>([^<]+)<\/span>/g, (m, pre, post, style, name) => {
      const classes = (pre + ' ' + post).trim().replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
      const classAttr = classes ? ` class="${classes.replace(/\bmaterial-symbols-outlined\b/g,'').trim()}"` : '';
      const styleAttr = style ? ` style="${style}"` : '';
      const cleanName = name.trim();
      return `<img src="/icons/${cleanName}.svg"${classAttr}${styleAttr} alt="${cleanName}" />`;
    });

    // Also handle spans that have material-symbols-outlined as the only class but other attrs or no class variations
    s = s.replace(/<span\s+class="material-symbols-outlined"(?:\s*style="([^"]*)")?>([^<]+)<\/span>/g, (m, style, name) => {
      const styleAttr = style ? ` style="${style}"` : '';
      const cleanName = name.trim();
      return `<img src="/icons/${cleanName}.svg"${styleAttr} alt="${cleanName}" />`;
    });

    // Handle spans where material-symbols-outlined appears among other attributes (e.g., data-icon)
    s = s.replace(/<span([^>]*)class="([^"]*?material-symbols-outlined[^"]*?)"([^>]*)>([^<]+)<\/span>/g, (m, before, classes, after, name) => {
      const otherAttrs = ((before + ' ' + after).trim().replace(/class="([^"]*)"/g,'')).trim();
      const classesOnly = classes.replace(/\bmaterial-symbols-outlined\b/g,'').trim();
      const classAttr = classesOnly ? ` class="${classesOnly}"` : '';
      const cleanName = name.trim();
      const attrs = otherAttrs ? ' ' + otherAttrs.trim() : '';
      return `<img src="/icons/${cleanName}.svg"${classAttr}${attrs} alt="${cleanName}" />`;
    });
  }

  // For CSS files and also HTML containing embedded CSS blocks, comment out .material-symbols-outlined blocks (including modifiers)
  s = s.replace(/(\.material-symbols-outlined[^\{]*\{[\s\S]*?\})/g, (m) => `/* Material Symbols (font) removed; use /public/icons/*.svg instead. Original styles:\n${m}\n*/`);

  // Replace any lingering literal occurrences of the token with a safe placeholder to avoid accidental font inclusion
  s = s.replace(/material-symbols-outlined/g, 'ms-removed');

  // Comment out any font-family declarations referencing Material Symbols
  s = s.replace(/font-family:\s*'Material Symbols Outlined'\s*;?/g, '/* Material Symbols (font) removed */');

  if(s !== orig){
    fs.writeFileSync(file,s,'utf8');
    console.log('Patched', file);
  }
});
console.log('Done');
