/* Accessibility helpers */
(function(){
  // Skip to content
  var skip=document.createElement('a')
  skip.href='#main-content'
  skip.className='skip-link'
  skip.textContent='Skip to content'
  skip.style.cssText='position:fixed;top:-40px;left:16px;z-index:9999;background:var(--teal);color:#fff;padding:8px 16px;border-radius:0 0 8px 8px;font-weight:700;font-size:14px;transition:top .2s'
  skip.addEventListener('focus',function(){skip.style.top='0'})
  skip.addEventListener('blur',function(){skip.style.top='-40px'})
  document.body.insertBefore(skip,document.body.firstChild)
  // Reduced motion
  var mq=window.matchMedia('(prefers-reduced-motion:reduce)')
  if(mq.matches){document.documentElement.style.setProperty('--transition','0s')}
})()
