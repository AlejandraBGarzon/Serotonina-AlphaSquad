/* ---------------------------------------------------------------------------------------------- */
/*                                 FUNCIONALIDAD PASARELA DE PAGO                                 */
/* ---------------------------------------------------------------------------------------------- */

var radios = document.querySelectorAll('.payment-radioGroup > input');

for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener('change', expandAccordion);
}

function expandAccordion (event) {
  var allTabs = document.querySelectorAll('.payment-tab');
  for (var i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove('payment-tab-isActive');
  }
  event.target.parentNode.parentNode.classList.add('payment-tab-isActive');
}