setTimeout(function() {
const el1ement = document.querySelector('div.ui_actions_menu_wrap._ui_menu_wrap.im-page--dialogs-call-wrap');
el1ement.removeAttribute('onmouseover');
el1ement.removeAttribute('onmouseout');
console.log("Star executed!")
},10000)