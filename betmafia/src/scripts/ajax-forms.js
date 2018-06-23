import { on, hasClass, closest } from './dom';
import { openCommonModal } from './modals';

const onsubmit = e => {
    const { target } = e;
    if ( !hasClass( target, 'ajax-form' )) {
      return;
    }

    handleForm( target, e );
  },
  handleForm = ( form, event ) => {
    if ( !form.checkValidity()) {
      return;
    }
    const body = new FormData( form );

    fetch( form.action, {
      method: form.method,
      body
    })
      .then( response => response.json())
      .then(() => openCommonModal( 'Спасибо!', 'Мы свяжемся с вами в ближайшее время' ))
      .catch(() => openCommonModal( 'Ошибочка!', 'Что-то пошло не так. Мы уже исправляем ошибку' ));

    event.preventDefault();
  },
  onclick = e => {
    const { target } = e;
    if ( !hasClass( target, 'ajax-form-submit' )) {
      return;
    }
    const form = closest( target, 'form' );
    if ( !form ) {
      return;
    }
    handleForm( form, e );
  },
  init = () => {
    on( document, 'submit', onsubmit );
    on( document, 'click', onclick );
  };

export {
  init as initAjaxForms
};
