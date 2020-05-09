console.log('Evil bitches');

window.setTimeout(function() {
  
  // JOURNAL DE MONTRÉAL
  if (window.location.href.indexOf("journaldemontreal.com") > -1) {
    let popups = document.getElementsByClassName('popup-adblocker');
    for (let i = 0; i < popups.length; i++) {
      popups[i].remove();
    }
    document.body.style.overflow = 'auto';
    document.body.style.height = '100%';  
  }
  
  // MTLBLOG
  if (window.location.href.indexOf("mtlblog.com") > -1) {
    let max = 4000, current = 0;
    let interval = window.setInterval(function() {
      let overlay = document.getElementsByClassName('fc-ab-root');
      if (overlay.length > 0) {
        overlay[0].remove();
      }
      document.body.style.overflow = 'auto';
      current += 200;
      if (current >= max) {
        window.clearInterval(interval);
      }
    }, 200)
  }
}, 10);
