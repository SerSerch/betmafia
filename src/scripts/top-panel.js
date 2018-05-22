import {
  hasClass,
  on
} from './dom';

let menuCheckbox;
const close = () => menuCheckbox.checked = false,
  init = () => {
    menuCheckbox = document.getElementById( 'menu-checkbox' );
    const menu = document.querySelector( '.menu' ),
      onclick = e => hasClass( e.target, 'menu__section' ) && close();
    on( menu, 'click', onclick );
  };

export {
  init as initTopPanel
};
