// Lists top-level bindings declared in more than one src file (shared IIFE scope).
const fs = require('fs'), path = require('path');
const parser = require('@babel/parser');
const files = fs.readdirSync('src').filter(f => f.endsWith('.js')).sort();
const decl = new Map();
for (const f of files) {
  const code = fs.readFileSync(path.join('src', f), 'utf8');
  let ast;
  try { ast = parser.parse(code, { sourceType: 'script', allowReturnOutsideFunction: true }); }
  catch (e) { console.log('PARSE ERROR', f, e.message); continue; }
  const add = (n) => { if (!decl.has(n)) decl.set(n, []); decl.get(n).push(f); };
  for (const st of ast.program.body) {
    if (st.type === 'VariableDeclaration') for (const d of st.declarations) { if (d.id.type === 'Identifier') add(d.id.name); else if (d.id.type === 'ObjectPattern') d.id.properties.forEach(p => p.value && p.value.type === 'Identifier' && add(p.value.name)); }
    else if (st.type === 'FunctionDeclaration' || st.type === 'ClassDeclaration') add(st.id.name);
  }
}
let bad = 0;
for (const [n, fs2] of decl) if (fs2.length > 1) { bad++; console.log(n, '->', fs2.join(', ')); }
console.log(bad ? bad + ' duplicate top-level names' : 'no duplicate top-level names');
