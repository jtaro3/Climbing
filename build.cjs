const fs = require('node:fs');
fs.mkdirSync('public/assets', { recursive: true });
for (const file of ['index.html','style.css','assets.js','engine.js','game.js']) fs.copyFileSync(file, 'public/'+file);
const vm = require('node:vm');
const settings = { window: {} };
vm.runInNewContext(fs.readFileSync('assets.js', 'utf8'), settings);
for (const sprite of Object.values(settings.window.BEAN_ASSETS.sprites)) {
  if (!sprite.src) continue;
  fs.mkdirSync(require('node:path').dirname('public/'+sprite.src), { recursive: true });
  fs.copyFileSync(sprite.src, 'public/'+sprite.src);
}
console.log('Static game built into public/');
