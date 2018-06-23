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
      activeClass = 'top-panel_active',
      scrolledClass = 'top-panel_1st-screen-scrolled',
      onclick = e => hasClass( e.target, 'menu__section' ) && close(),
      onscroll = e => {
        const top = window.pageYOffset,
          show = top < 100 || top < scrollTop,
          headerHeight = document.querySelector( '.header' ).offsetHeight;

        show ? addClass( panel, activeClass ) : removeClass( panel, activeClass );
        top > headerHeight ? addClass( panel, scrolledClass ) : removeClass( panel, scrolledClass );
        scrollTop = top;
      };
    on( menu, 'click', onclick );
    on( window, 'scroll', onscroll );
  };

export {
  init as initTopPanel
};
