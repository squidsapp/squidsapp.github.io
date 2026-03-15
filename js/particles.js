(function(){
  const canvas=document.getElementById('particles')
  if(!canvas)return
  const ctx=canvas.getContext('2d')
  let W,H,particles=[],connections=[]
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
  window.addEventListener('resize',resize);resize()
  for(let i=0;i<50;i++)particles.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.2+.3,a:Math.random()*.3+.05})
  function draw(){
    ctx.clearRect(0,0,W,H)
    particles.forEach((p,i)=>{
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
      ctx.fillStyle=`rgba(20,180,157,${p.a})`;ctx.fill()
      for(let j=i+1;j<particles.length;j++){
        const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy)
        if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(20,180,157,${.06*(1-d/120)})`;ctx.lineWidth=.5;ctx.stroke()}
      }
      p.x+=p.vx;p.y+=p.vy
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0
    })
    requestAnimationFrame(draw)
  }
  draw()
})()
