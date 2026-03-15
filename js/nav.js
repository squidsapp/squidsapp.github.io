(function(){
  var nav=document.querySelector('.nav')
  var hamburger=document.querySelector('.hamburger')
  var mobileMenu=document.querySelector('.mobile-menu')
  var mobileClose=document.querySelector('.mobile-close')
  function setNav(){if(nav)nav.classList.toggle('solid',window.scrollY>40)}
  function toggleMenu(open){
    if(!mobileMenu)return
    mobileMenu.classList.toggle('open',open)
    document.body.style.overflow=open?'hidden':''
    var spans=hamburger&&hamburger.querySelectorAll('span')
    if(spans){spans[0].style.transform=open?'rotate(45deg) translate(5px,5px)':'';spans[1].style.opacity=open?'0':'1';spans[2].style.transform=open?'rotate(-45deg) translate(5px,-5px)':''}
  }
  if(hamburger)hamburger.addEventListener('click',function(){toggleMenu(!mobileMenu.classList.contains('open'))})
  if(mobileClose)mobileClose.addEventListener('click',function(){toggleMenu(false)})
  if(mobileMenu)mobileMenu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){toggleMenu(false)})})
  window.addEventListener('scroll',setNav,{passive:true})
  setNav()
})()
