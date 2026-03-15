(function(){
  var stored=localStorage.getItem('squids-theme')
  if(stored==='light')document.documentElement.classList.add('theme-light')
  window.toggleTheme=function(){
    var isLight=document.documentElement.classList.toggle('theme-light')
    localStorage.setItem('squids-theme',isLight?'light':'dark')
  }
})()
