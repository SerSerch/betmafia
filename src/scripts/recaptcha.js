import { query } from './dom';

const scrollTo = selector => {
    const target = query( document, selector ),
      y = target.offsetTop;
    window.scrollTo( 0, y );
  },
  render = element => window.grecaptcha.render( element, {
    sitekey: element.dataset.sitekey,
    theme: 'light',
    callback: () => scrollTo( element.dataset.scrollTarget )
  }),
  load = () => new Promise( resolve => {
    let timeout;
    const check = () => {
      if ( window.grecaptcha ) {
        clearTimeout( timeout );
        return resolve();
      }
      timeout = setTimeout( check, 100 );
    };

    check();
  }),
  renderAll = () => document
    .querySelectorAll( '.g-recaptcha' )
    .forEach( render ),
  init = () => {
    const script = document.createElement( 'script' );
    script.src = 'http://www.google.com/recaptcha/api.js?onload=reCaptchaCallback&render=explicit';
    document.head.appendChild( script );

    window.reCaptchaCallback = () => load().then( renderAll );
  };

export {
  init as initReCaptcha
};
