const fs = require('node:fs');
fs.mkdirSync('public/assets', { recursive: true });
for (const file of ['index.html','style.css','assets.js','engine.js','game.js']) fs.copyFileSync(file, 'public/'+file);
fs.copyFileSync('assets/storybook.png','public/assets/storybook.png');
console.log('Static game built into public/');
