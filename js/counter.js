(function(){
  function easeOut(t){return 1-Math.pow(1-t,3)}
  window.animateCounter=function(el,from,to,duration,suffix){
    const start=performance.now()
    const isFloat=String(to).includes('.')
    function step(now){
      const p=Math.min((now-start)/duration,1)
      const v=from+(to-from)*easeOut(p)
      el.textContent=(isFloat?v.toFixed(1):Math.floor(v).toLocaleString())+(suffix||'')
      if(p<1)requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }
  document.querySelectorAll('[data-animate-count]').forEach(el=>{
    const target=parseFloat(el.dataset.animateCount)
    const suffix=el.dataset.suffix||''
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){window.animateCounter(el,0,target,1800,suffix);observer.unobserve(el)}
      })
    },{threshold:.5})
    observer.observe(el)
  })
})()
