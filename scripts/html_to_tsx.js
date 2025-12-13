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

function camelCaseProp(k){
  return k.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
}

function styleToObjectLiteral(style){
  // input: "width:1em;height:1em;background-image: url('res.png')"
  const parts = style.split(';').map(s=>s.trim()).filter(Boolean);
  const obj = {};
  parts.forEach(p=>{
    const idx = p.indexOf(':');
    if(idx === -1) return;
    const key = p.slice(0, idx).trim();
    const val = p.slice(idx+1).trim();
    const k = camelCaseProp(key);
    // numeric?
    if(/^[-+]?[0-9]*\.?[0-9]+$/.test(val)) obj[k] = Number(val);
    else {
      // normalize url("...") or url('...') to url('...') to simplify quoting
      let v = val.replace(/url\((['"])(.*?)\1\)/g, "url('$2')");
      // escape single quotes for safe embedding in single-quoted JS strings
      v = v.replace(/'/g, "\\'");
      obj[k] = v;
    }
  });
  // produce JS object literal string
  const entries = Object.keys(obj).map(k=>{
    const v = obj[k];
    if(typeof v === 'number') return `${k}: ${v}`;
    // use single-quoted string and escape single quotes
    const esc = String(v).replace(/'/g, "\\'");
    return `${k}: '${esc}'`;
  });
  return entries.length ? `{ ${entries.join(', ')} }` : null;
}

const root = path.join(__dirname,'..','docs','30_画面イメージ');
const files = walk(root).filter(p => p.endsWith('code.html'));
console.log('Found', files.length, 'files to convert');

files.forEach(file => {
  const dir = path.dirname(file);
  const base = path.basename(dir);
  // slug by replacing non-word with '-'
  const slug = base.replace(/[^\w\-]+/g, '-').replace(/-+/g,'-').replace(/^-|-$/g,'').toLowerCase();
  const outDir = path.join(__dirname,'..','app','docs-preview', slug);
  fs.mkdirSync(outDir, { recursive: true });

  let s = fs.readFileSync(file,'utf8');
  // extract body
  const bodyMatch = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1].trim() : s;

  // Move background-image url(...) references into a data-bg attribute for safer conversion
  body = body.replace(/style=(?:"([^"]*)"|'([^']*)')/gi, (m, s1, s2) => {
    const style = s1 != null ? s1 : s2;
    const urlMatch = style.match(/url\((['"]?)(res_[^'"\)]+|data:[^'"\)]+)\1\)/i);
    if(urlMatch){
      const url = urlMatch[2];
      // remove the url(...) part from the style
      const cleaned = style.replace(/url\((['"]?)(res_[^'"\)]+|data:[^'"\)]+)\1\)/gi, '').trim();
      const styleAttr = cleaned ? `style="${cleaned}" ` : '';
      return `${styleAttr}data-bg="${url}"`;
    }
    return m;
  });

  // convert class -> className (careful not to touch className already)
  body = body.replace(/class="/g, 'className="');

  // Normalize common SVG attribute names to JSX-compatible camelCase
  const svgAttrMap = {
    'preserveaspectratio': 'preserveAspectRatio',
    'viewbox': 'viewBox',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule'
  };
  Object.keys(svgAttrMap).forEach(k => {
    const re = new RegExp(`\\s${k}=(\"|')`, 'gi');
    body = body.replace(re, ` ${svgAttrMap[k]}=$1`);
  });
  
    // convert HTML comments <!-- ... --> to JSX comments {/* ... */}
    body = body.replace(/<!--([\s\S]*?)-->/g, (m, inner) => {
      return `{/* ${inner.replace(/\*\//g, '')} */}`;
    });

  // convert style="..." or style='...' -> style={{...}}
  body = body.replace(/style=(?:"([^"]*)"|'([^']*)')/g, (m, s1, s2) => {
    const sty = s1 != null ? s1 : s2;
    const obj = styleToObjectLiteral(sty);
    return obj ? `style={${obj}}` : '';
  });

  // Convert <style>...</style> to JSX-friendly <style dangerouslySetInnerHTML={{__html: `...`}} />
  body = body.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (m, css) => {
    // css will include the opening tag and closing tag; extract inner
    const inner = (m.match(/<style[^>]*>([\s\S]*?)<\/style>/i) || [null, ''])[1];
    // escape backticks and ${ to be safe in template literal
    const safe = String(inner).replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    return `<style dangerouslySetInnerHTML={{ __html: ` + "`" + `${safe}` + "`" + ` }} />`;
  });

  // Normalize url("res_...png") to url('res_...png') to avoid escaped-quote issues in generated JSX
  body = body.replace(/url\\\(\\\"([^\\\"]+)\\\"\\\)/g, `url('$1')`);

  // ensure self-closing tags where appropriate (img -> already converted), replace any remaining <img ...> to <img ... />
  body = body.replace(/<img([^>]*)>/g, (m, attrs) => {
    // strip any trailing slash in captured attrs to avoid producing "//" when adding our own
    const cleaned = attrs.replace(/\s*\/\s*$/, '');
    return `<img${cleaned} />`;
  });

  // Replace empty elements that carry data-bg with an <img> child using that resource
  body = body.replace(/<([a-z0-9]+)([^>]*)data-bg="([^"]+)"([^>]*)>\s*<\/\1>/gi, (m, tag, before, url, after) => {
    // remove data-bg attribute from attributes
    const attrs = (before + ' ' + after).replace(/\sdata-bg="[^"]+"/i, '');
    return `<${tag}${attrs}><img src="/${url}" alt="" className="absolute inset-0 w-full h-full object-cover" /></${tag}>`;
  });

  // remove any <script src=...> tags from body (we don't need inline scripts)
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Wrap in TSX component
  const importPath = '../../../components/Icon';
  const page = `import Icon from '${importPath}';\nimport React from 'react';\n\nexport default function Page(){\n  return (\n    <>\n${body.split('\n').map(l => '      ' + l).join('\n')}\n    </>\n  );\n}\n`;

  const outFile = path.join(outDir,'page.tsx');
  fs.writeFileSync(outFile,page,'utf8');
  console.log('Wrote', outFile);
  // Post-process generated TSX to handle escaped data:image URLs in style attributes
  let outContent = fs.readFileSync(outFile, 'utf8');
  const dataUrlRe = /style=\{\s*\{\s*backgroundImage:\s*'url\\\('?(data:[^']+)'\\\)'\s*\}\s*\}/g;
  if(dataUrlRe.test(outContent)){
    outContent = outContent.replace(dataUrlRe, (m, dataUrl) => `data-bg="${dataUrl}"`);
    fs.writeFileSync(outFile, outContent, 'utf8');
    console.log('Post-Patched data URLs in', outFile);
  }
});

console.log('Done');
