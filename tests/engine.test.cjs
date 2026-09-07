const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const env={window:{}};vm.createContext(env);vm.runInContext(fs.readFileSync('assets.js','utf8'),env);vm.runInContext(fs.readFileSync('engine.js','utf8'),env);const config=env.window.BEAN_CONFIG,World=env.window.BeanWorld;
const w=new World(config);w.state='playing';w.jump();for(let i=0;i<30;i++)w.step(1/120,0,0);assert(w.player.y>160,'jump reaches next leaf');
const a=new World(config),b=new World(config);a.state=b.state='playing';for(let i=0;i<50;i++){a.step(1/120,0,0);b.step(1/120,0,1);}assert(b.player.x<a.player.x,'wind moves left');
const paused=new World(config);paused.state='paused';paused.step(.02,1,1);assert.equal(paused.player.x,240);
const climb=new World(config);climb.state='playing';let target=1;for(let t=0;t<120*130&&climb.state==='playing';t++){if(climb.player.grounded){target=climb.platforms.findIndex(p=>p.y>climb.player.y+1);climb.jump();}const dest=climb.platforms[target];const axis=dest?Math.max(-1,Math.min(1,(dest.x-climb.player.x)*.15)):0;climb.step(1/120,axis,1);}assert.equal(climb.state,'won','all platforms reachable even at maximum wind');
const loss=new World(config);loss.state='playing';loss.player.x=30;loss.player.y=-70;loss.step(1/120,0,0);assert.equal(loss.state,'lost');loss.reset();assert.equal(loss.state,'ready');assert.equal(loss.height(),0);
console.log('PASS: jump height, wind, pause, full 600m climb at max wind, fall and reset');
