import { on, addClass, removeClass, hasClass, attr } from './dom';

const findModal = element => {
    const selector = attr( element, 'href' ) || element.dataset.toggle;
    return document.querySelector( selector );
  },
  open = modal => addClass( modal, 'modal_active' ),
  openCommonModal = ( title, content ) => {
    const modal = document.getElementById( 'common-modal' ),
      bodyElement = modal.querySelector('.modal-body'),
      titleElement = modal.querySelector('.modal-title');

    bodyElement.innerHTML = content;
    titleElement.innerHTML = title;
    open( modal );
  },
  close = modal => removeClass( modal, 'modal_active' ),
  init = () => {
    const onclick = e => {
      const { target } = e;
      let element = target.closest( '.modal-toggle' );
      if ( element ) {
        const modal = findModal( element );
        console.log({ modal, target });
        open( modal );
        e.preventDefault();
      }
      else if ( hasClass( target, 'modal' )) {
        close( target );
      }
      else if ( element = target.closest( '.modal-close' )) {
        const modal = element.closest( '.modal' );
        close( modal );
      }
    };
    on( document, 'click', onclick );
  };

export {
  init as initModals,
  openCommonModal
};
