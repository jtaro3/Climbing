(function(root){
 'use strict';
 class BeanWorld {
  constructor(config){this.c=config;this.reset();}
  reset(){this.player={x:240,y:65,vy:0,face:1,grounded:true};this.camera=0;this.time=0;this.highest=65;this.state='ready';this.jumpBuffer=0;this.coyote=.1;this.platforms=[{x:240,y:65,w:160}];for(let i=1;i<=64;i++){this.platforms.push({x:240+Math.sin(i*1.35)*76,y:65+i*this.c.stepHeight,w:90+((i*37)%45)});} }
  jump(){if(this.state==='playing')this.jumpBuffer=.14;}
  step(dt,axis,windStrength){if(this.state!=='playing')return;dt=Math.min(dt,1/30);this.time+=dt;const p=this.player,c=this.c;this.jumpBuffer=Math.max(0,this.jumpBuffer-dt);this.coyote=p.grounded?.1:Math.max(0,this.coyote-dt);if(this.jumpBuffer>0&&this.coyote>0){p.vy=c.jumpSpeed;p.grounded=false;this.coyote=0;this.jumpBuffer=0;}const prev=p.y;const gust=this.gust();p.x+= (Math.max(-1,Math.min(1,axis))*c.moveSpeed-gust*c.maxWindSpeed*windStrength)*dt;p.x=Math.max(c.playerHalfWidth,Math.min(c.width-c.playerHalfWidth,p.x));if(Math.abs(axis)>.1)p.face=axis<0?-1:1;p.vy-=c.gravity*dt;p.y+=p.vy*dt;p.grounded=false;if(p.vy<=0){for(const l of this.platforms){if(prev>=l.y-.01&&p.y<=l.y&&Math.abs(p.x-l.x)<l.w/2+c.playerHalfWidth*.6){p.y=l.y;p.vy=0;p.grounded=true;break;}}}this.highest=Math.max(this.highest,p.y);this.camera=Math.max(this.camera,p.y-340);if(p.y<this.camera-60)this.state='lost';if(p.y>=c.goalHeight)this.state='won';}
  gust(){return Math.max(0,Math.sin(this.time*.8-.8))*.8+.12;}
  height(){return Math.max(0,Math.floor((this.highest-65)/10));}
 }
 root.BeanWorld=BeanWorld;
})(typeof window!=='undefined'?window:globalThis);
