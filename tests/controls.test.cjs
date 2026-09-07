const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let now=0,frame,pad=null;const listeners={},nodes={};
const context=new Proxy({createLinearGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})});
function node(id){return nodes[id]??=( {textContent:'',innerHTML:'',style:{},classList:{toggle(){}},setAttribute(){},focus(){},setPointerCapture(){},getContext:()=>context,addEventListener:(name,fn)=>listeners[id+':'+name]=fn});}
const win={addEventListener:(name,fn)=>listeners['window:'+name]=fn};const document={getElementById:node,querySelector:()=>node('shell'),addEventListener:(name,fn)=>listeners['document:'+name]=fn};
const env={window:win,document,Image:class{},HTMLInputElement:class{},performance:{now:()=>now},navigator:{getGamepads:()=>pad?[pad]:[]},localStorage:{getItem:()=>null,setItem(){}},requestAnimationFrame:fn=>frame=fn,console};vm.createContext(env);
for(const file of ['assets.js','engine.js'])vm.runInContext(fs.readFileSync(file,'utf8'),env);Object.assign(env,win);vm.runInContext(fs.readFileSync('game.js','utf8'),env);const game=win.beanGame;game.start();
function touch(name,id,x,y=100){listeners['game:'+name]({pointerId:id,clientX:x,clientY:y,type:name,preventDefault(){}});}
touch('pointerdown',1,100);now=100;touch('pointerup',1,100);assert(game.world.jumpBuffer>0,'tap jumps');game.world.jumpBuffer=0;
touch('pointerdown',2,100);touch('pointermove',2,140);now=200;touch('pointerup',2,140);assert.equal(game.world.jumpBuffer,0,'swipe does not jump');
touch('pointerdown',3,100);touch('pointermove',3,140);frame(0);const x=game.world.player.x;frame(20);frame(40);assert(game.world.player.x>x,'drag moves right');touch('pointercancel',3,140);
game.world.reset();game.world.state='playing';pad={axes:[.8],buttons:Array.from({length:16},(_,i)=>({pressed:i===0}))};frame(60);assert(game.world.player.vy>0,'gamepad A jumps');assert(game.world.player.x>240,'stick moves');
listeners['window:blur']();assert.equal(game.world.state,'paused','blur pauses');
console.log('PASS: tap, swipe discrimination, drag, cancellation, gamepad jump/move, blur pause');
