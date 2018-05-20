import domready from 'domready';
import lazyframe from 'lazyframe';

const compose = ( ...fns ) => value =>
    fns.reduceRight(
      ( currentValue, fn ) => fn( currentValue ),
      value
    ),
  cssrelpreload = () => require( 'imports-loader?this=>global!../../node_modules/fg-loadcss/src/cssrelpreload.js' ),
  initIFrames = () =>
    lazyframe( '.lazyframe', {
      lazyload: true
    }),
  ready = handler => {
    const isIE10 = navigator.appVersion.indexOf( 'MSIE 10' ) !== -1;

    isIE10 ? window.onload = handler : domready( handler );
  };

export { compose, ready, cssrelpreload, initIFrames };
