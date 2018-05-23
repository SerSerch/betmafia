import { on, addClass, removeClass, attr } from './dom';

const findModal = element => {
    const selector = attr( element, 'href' ) || element.dataset.toggle;
    return document.querySelector( selector );
  },
  open = modal => addClass( modal, 'modal_active' ),
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
      else if ( element = target.closest( '.modal' )) {
        close( element );
      }
      else if ( element = target.closest( '.modal-close' )) {
        const modal = element.closest( '.modal' );
        close( modal );
      }
    };
    on( document, 'click', onclick );
  };

export {
  init as initModals
};
