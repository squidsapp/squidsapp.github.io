(function(){
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item')
      const isOpen=item.classList.contains('active')
      document.querySelectorAll('.faq-item.active').forEach(i=>i.classList.remove('active'))
      if(!isOpen)item.classList.add('active')
    })
  })
})()
