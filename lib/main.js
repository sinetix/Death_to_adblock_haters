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
  
}, 300);
