// Scope-aware rename of esbuild-mangled top-level bindings back to readable names.
// three.js classes are recovered via their `isXxx = true` markers, constants via value.
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const src = fs.readFileSync(process.argv[2], 'utf8');
const ast = parser.parse(src, { sourceType: 'script', allowReturnOutsideFunction: true });

// ---- three constants table (value -> name), only unique values >= 100 or well-known
const constSrc = fs.readFileSync('node_modules/three/src/constants.js', 'utf8');
const constMap = new Map();
const dup = new Set();
for (const m of constSrc.matchAll(/export const (\w+) = ([^;]+);/g)) {
  const name = m[1]; let v = m[2].trim();
  let val;
  if (/^-?\d+$/.test(v)) val = Number(v);
  else if (/^'[^']*'$/.test(v)) val = v.slice(1, -1);
  else continue;
  const key = typeof val + ':' + val;
  if (constMap.has(key)) { dup.add(key); continue; }
  constMap.set(key, name);
}
for (const k of dup) constMap.delete(k);

// find the IIFE body
let body = null;
traverse(ast, { Program(p) { const st = p.node.body[0]; const call = st.expression; const fn = call.callee; body = fn.body; p.stop(); } });

// collect top-level bindings inside the IIFE
const iifeScopePath = (() => { let r; traverse(ast, { ArrowFunctionExpression(p) { if (p.node.body === body) { r = p; p.stop(); } } }); return r; })();
const scope = iifeScopePath.scope;
const renames = new Map();
// index of the statement that registers __THREE__ : constants after it are app code
let threeEnd = body.body.findIndex(st => generate(st,{compact:true}).code.includes('__THREE__'));
function stmtIndex(path){ let p=path; while(p && p.parentPath && p.parentPath.node!==body) p=p.parentPath; return body.body.indexOf(p.node); }
const used = new Set(Object.keys(scope.bindings));

function markerName(node) {
  // class expression / function with this.isXxx = !0
  const s = generate(node, { compact: true }).code;
  const m = s.match(/this\.is([A-Z]\w*)=!0/) || s.match(/\.prototype\.is([A-Z]\w*)=!0/) || s.match(/\bis([A-Z]\w*):!0/) || s.match(/this\.type="([A-Z]\w*)"/);
  if (!m) return null;
  // prefer the LAST marker in constructor? First marker is the class's own. Actually subclasses set own marker first, then super sets parent marker — pick first.
  return m[1];
}
function unique(base) { let n = base, i = 2; while (used.has(n)) n = base + '_' + (i++); used.add(n); return n; }

for (const [name, b] of Object.entries(scope.bindings)) {
  if (name.length > 3) continue; // already readable
  const decl = b.path.node;
  let init = null;
  if (b.kind === 'var' || b.kind === 'let' || b.kind === 'const') init = decl.init;
  else if (b.kind === 'hoisted') init = decl; // function decl
  if (!init) continue;
  let newName = null;
  if (t.isClassExpression(init) || t.isClassDeclaration(init) || t.isFunctionExpression(init) || t.isFunctionDeclaration(init)) {
    const mn = markerName(init);
    if (mn) newName = mn;
  } else if (t.isNumericLiteral(init) || t.isStringLiteral(init) || (t.isUnaryExpression(init) && t.isNumericLiteral(init.argument))) {
    let val = t.isUnaryExpression(init) ? -init.argument.value : init.value;
    const key = typeof val + ':' + val;
    if (stmtIndex(b.path) > threeEnd) continue;
    if (typeof val === 'number' && val >= 100 && constMap.has(key)) newName = constMap.get(key);
    if (typeof val === 'string' && val.length > 2 && constMap.has(key)) newName = constMap.get(key);
  }
  if (newName && newName !== name) renames.set(name, unique(newName));
}
for (const [o,n] of [["He","Float32BufferAttribute"],["Pr","PMREMGenerator"]]) if (scope.bindings[o] && !renames.has(o)) renames.set(o, unique(n));
for (const [o, n] of renames) scope.rename(o, n);
fs.writeFileSync(process.argv[3], generate(ast, { retainLines: false, compact: false }).code);
fs.writeFileSync(process.argv[3] + '.map.json', JSON.stringify([...renames], null, 1));
console.log('renamed', renames.size);
