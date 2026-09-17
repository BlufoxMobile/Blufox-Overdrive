// Headless screenshot harness for dist/index.html (or any built html).
// usage: node tools/shot.js --out shots/x.png [--file dist/index.html] [--screen home|garage|circuits|settings]
//        [--track N] [--driver N] [--race] [--wait MS] [--w 844 --h 390] [--steps N] [--drive left|right|none]
// --race: starts a race and fast-steps the simulation (race.update) so a real racing frame is captured
// without waiting for SwiftShader. Console errors are printed.
const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');

const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => a.startsWith('--') ? [a.slice(2), (arr[i + 1] && !arr[i + 1].startsWith('--')) ? arr[i + 1] : true] : null).filter(Boolean));
const W = +(args.w || 844), H = +(args.h || 390);
const file = path.resolve(args.file || 'dist/index.html');
const out = args.out || 'shots/shot.png';
fs.mkdirSync(path.dirname(out), { recursive: true });

(async () => {
  const server = http.createServer((req, res) => {
    const p = req.url.split('?')[0];
    const f = p === '/' ? file : path.join(path.dirname(file), p);
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': f.endsWith('.html') ? 'text/html' : 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  }).listen(0);
  const port = server.address().port;
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text().slice(0, 300)); });
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  await page.goto(`http://127.0.0.1:${port}/`, { timeout: 180000 });
  await page.waitForTimeout(+(args.boot || 4000));
  // get past boot/title if present
  await page.evaluate(() => { try { window.__blufox && window.__blufox.screen && window.__blufox.screen('home'); } catch (e) { } });
  if (args.screen) await page.evaluate((s) => window.__blufox.screen(s), args.screen);
  if (args.driver !== undefined || args.track !== undefined) {
    await page.evaluate(([d, t]) => window.__blufox.select(d, t), [+(args.driver || 0), +(args.track || 0)]);
  }
  if (args.race) {
    await page.evaluate(() => window.__blufox.startRace());
    for (let i = 0; i < 60; i++) { if (await page.evaluate(() => !!window.__blufox.race)) break; await page.waitForTimeout(1000); }
    // burn the countdown
    await page.evaluate(() => { const r = window.__blufox.race; for (let i = 0; i < 220 && r.countdown > 0; i++) r.update(1 / 60, {}); });
    const steps = +(args.steps || 400);
    const drive = args.drive || 'none';
    const info = await page.evaluate(([steps, drive]) => {
      const r = window.__blufox.race; if (!r) return 'no race';
      const inp = window.__blufox.input;
      for (let i = 0; i < steps; i++) {
        try {
          r.update(1 / 60, { steer: drive === 'left' ? -0.6 : drive === 'right' ? 0.6 : 0, drift: false, brake: false });
        } catch (e) { return 'update error: ' + e.message; }
      }
      const p = r.player || (r.racers && r.racers.find(x => x.isPlayer));
      return p ? `player dist=${(p.distance || p.dist || 0).toFixed(1)} speed=${(p.speed || 0).toFixed(1)} lap=${p.lap}` : 'ok';
    }, [steps, drive]);
    console.log('race:', info);
  }
  await page.waitForTimeout(+(args.wait || 6000));
  await page.screenshot({ path: out, timeout: 180000 });
  console.log('saved', out, errors.length ? '\nERRORS:\n' + errors.slice(0, 20).join('\n') : '(no console errors)');
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
