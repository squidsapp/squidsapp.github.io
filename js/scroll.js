(function(){
  const els=document.querySelectorAll('.reveal,.stagger-parent')
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('visible'));return}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})
  },{threshold:.12,rootMargin:'0px 0px -30px 0px'})
  els.forEach(el=>io.observe(el))
})()
