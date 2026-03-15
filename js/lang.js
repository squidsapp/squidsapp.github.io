(function(){
  var langMap={ar:'/pages/ar/',fr:'/pages/fr/',sw:'/pages/sw/',zu:'/pages/zu/',pt:'/pages/pt/',es:'/pages/es/',ha:'/pages/ha/',yo:'/pages/yo/',en:'/'}
  var path=window.location.pathname
  document.querySelectorAll('[data-lang-switch]').forEach(function(el){
    el.addEventListener('click',function(){
      var lang=el.dataset.langSwitch
      if(langMap[lang])window.location.href=langMap[lang]
    })
  })
})()
