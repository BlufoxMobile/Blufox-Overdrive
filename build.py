#!/usr/bin/env python3
"""Bundle src/*.js (in name order) into the single-file game dist/index.html.
All modules share one IIFE scope, exactly like the esbuild bundle they came from."""
import glob, os, sys, re
here=os.path.dirname(os.path.abspath(__file__))
files=sorted(glob.glob(os.path.join(here,'src','*.js')))
js='(() => {\n'+'\n'.join(open(f).read() for f in files)+'\n})();\n'
shell=open(os.path.join(here,'shell.html')).read()
assert '<script>/*BUNDLE*/</script>' in shell
if '</script' in js: js=js.replace('</script','<\\/script')
out=shell.replace('<script>/*BUNDLE*/</script>','<script>\n'+js+'</script>')
os.makedirs(os.path.join(here,'dist'),exist_ok=True)
open(os.path.join(here,'dist','index.html'),'w').write(out)
print('dist/index.html',len(out.encode()),'bytes')
