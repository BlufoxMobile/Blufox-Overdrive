import subprocess, pathlib, re, sys
ROOT = pathlib.Path('/home/claude/blufox/rebuild')
SRC, DIST = ROOT/'src', ROOT/'dist'
DIST.mkdir(exist_ok=True)

# 1. bundle the ES module graph into one IIFE
js_out = DIST/'bundle.js'
r = subprocess.run([str(ROOT/'node_modules/.bin/esbuild'), str(SRC/'game.js'),
                    '--bundle', '--format=iife', '--target=es2019',
                    '--minify', '--legal-comments=none', '--outfile='+str(js_out)],
                   capture_output=True, text=True)
if r.returncode != 0:
    print(r.stderr); sys.exit(1)
print('bundled js:', js_out.stat().st_size, 'bytes')

html = (SRC/'index.html').read_text(encoding='utf-8')
css  = (SRC/'style.css').read_text(encoding='utf-8')
js   = js_out.read_text(encoding='utf-8')

# 2. inline the stylesheet
html, n = re.subn(r'<link[^>]+rel="stylesheet"[^>]*>', '<style>\n'+css+'\n</style>', html, count=1)
assert n == 1, 'stylesheet link not found'

# 3. inline the script (drop type=module — the IIFE is classic script)
html, n = re.subn(r'<script[^>]*src="[^"]*game\.js[^"]*"[^>]*></script>',
                  lambda m: '<script>\n'+js+'\n</script>', html, count=1)
assert n == 1, 'game.js script tag not found'

# 4. nothing external may remain
leftovers = re.findall(r'(?:src|href)="(?!data:|#)([^"]+)"', html)
if leftovers:
    print('WARNING external refs remain:', set(leftovers))

# 5. ship the GLB assets next to the page (they are fetched at runtime)
import shutil
adst = DIST/'assets'
if adst.exists(): shutil.rmtree(adst)
shutil.copytree(SRC/'assets', adst)
print('assets:', sum(f.stat().st_size for f in adst.iterdir()), 'bytes in', len(list(adst.iterdir())), 'files')

out = DIST/'Blufox-Overdrive.html'
out.write_text(html, encoding='utf-8')
(DIST/'index.html').write_text(html, encoding='utf-8')
print(out, out.stat().st_size, 'bytes', round(out.stat().st_size/1024/1024,2), 'MB')
