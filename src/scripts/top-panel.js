import {
  hasClass,
  addClass,
  removeClass,
  on
} from './dom';

let menuCheckbox;
const close = () => menuCheckbox.checked = false,
  init = () => {
    menuCheckbox = document.getElementById( 'menu-checkbox' );
    let scrollTop = window.pageYOffset;
    const panel = document.querySelector( '.top-panel' ),
      menu = document.querySelector( '.menu' ),
      onclick = e => hasClass( e.target, 'menu__section' ) && close(),
      onscroll = e => {
        const top = window.pageYOffset;
        top < scrollTop ? addClass( panel, 'top-panel_active' ) : removeClass( panel, 'top-panel_active' );
        scrollTop = top;
      };
    on( menu, 'click', onclick );
    on( window, 'scroll', onscroll );
  };

export {
  init as initTopPanel
};
