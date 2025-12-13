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

function extractSize(classAttr, styleAttr){
  if(styleAttr){
    const w = styleAttr.match(/width:\s*([0-9.]+)(px|rem|em)/);
    if(w){
      let val = parseFloat(w[1]);
      const unit = w[2];
      if(unit === 'rem' || unit === 'em') val = Math.round(val * 16);
      return Math.round(val);
    }
    const wp = styleAttr.match(/width:\s*([0-9.]+)px/);
    if(wp) return Math.round(parseFloat(wp[1]));
  }
  if(classAttr){
    const txt = classAttr.match(/text-\[([0-9]+)px\]/);
    if(txt) return parseInt(txt[1],10);
    const txtpx = classAttr.match(/text-([0-9]+)px/);
    if(txtpx) return parseInt(txtpx[1],10);
  }
  return null;
}

const root = path.join(__dirname,'..','docs','30_画面イメージ');
const files = walk(root).filter(p => p.endsWith('.html'));
console.log('Processing', files.length, 'HTML files');

files.forEach(file => {
  let s = fs.readFileSync(file,'utf8');
  const orig = s;
  // First, where we previously inserted a comment like:
  // <!-- React Icon: <Icon ... /> -->\n+  // <img src="/icons/NAME.svg" ... />
  // replace both with the actual JSX <Icon ... /> (remove comment markers).
  s = s.replace(/<!--\s*React Icon:\s*(<Icon[^>]*\/>)\s*-->\s*<img\s+[^>]*?src=\"\/icons\/[^"]+?\.svg\"[^>]*>/g, (m, jsx) => {
    return jsx;
  });

  // For any remaining <img src="/icons/NAME.svg" ... /> (no preceding comment),
  // synthesize an <Icon /> replacement using detected attributes.
  s = s.replace(/<img\s+([^>]*?)src="\/icons\/([^">]+?)\.svg"([^>]*)>/g, (m, before, name, after) => {
    // combine attributes
    const all = (before + ' ' + after).trim();
    const classMatch = all.match(/class="([^"]*)"/);
    const styleMatch = all.match(/style="([^"]*)"/);
    const classAttr = classMatch ? classMatch[1] : '';
    const styleAttr = styleMatch ? styleMatch[1] : '';
    const size = extractSize(classAttr, styleAttr);

    const sizeStr = size ? ` size={${size}}` : '';
    const classStr = classAttr ? ` className=\"${classAttr.replace(/\"/g,'') }\"` : '';
    const jsx = `<Icon name=\"${name}\"${classStr}${sizeStr} />`;
    return jsx;
  });

  if(s !== orig){
    fs.writeFileSync(file,s,'utf8');
    console.log('Patched', file);
  }
});
console.log('Done');
