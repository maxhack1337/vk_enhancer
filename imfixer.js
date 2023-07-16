document.addEventListener('DOMContentLoaded', function () {
// Находим элемент <button> по его классу или другому селектору
const buttonElement = document.querySelector('.im-page--dialogs-header-control_call');

// Создаем новый элемент <a>
const linkElement = document.createElement('a');
linkElement.setAttribute('tabindex', '0');
linkElement.setAttribute('role', 'link');
linkElement.classList.add('ui_actions_menu_item', 'im-action', 'im-action_favorites', '_im_search_more_action');
linkElement.setAttribute('data-action', 'favorites');
linkElement.innerText = '';
linkElement.style = 'margin-top: 8px; padding-left: 20px; background-color: #fff; background: url(https://sun9-33.userapi.com/impg/cAWfwzC-vRiWXCNs6daC4kJswRmLn_XL7Zi1sw/VgHLi5kumV4.jpg?size=24x24&quality=96&sign=71effcfb859fb3a838d3a04f312b2a8f&type=album) no-repeat; background-position: 15px 6.7px; background-size: 45% auto; opacity: .7';
linkElement.removeEventListener('mouseover', null);

// Заменяем <button> на <a>
buttonElement.parentNode.replaceChild(linkElement, buttonElement);

var svgElement = linkElement.querySelector('svg');

// Удаляем SVG-элемент из родительского элемента
if (svgElement) {
  svgElement.remove();
}
});




