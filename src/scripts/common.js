import domready from 'domready';

const compose = ( ...fns ) => value =>
    fns.reduceRight(
      ( currentValue, fn ) => fn( currentValue ),
      value
    ),
  cssrelpreload = () => require( 'imports-loader?this=>global!../../node_modules/fg-loadcss/src/cssrelpreload.js' ),
  ready = handler => {
    const isIE10 = navigator.appVersion.indexOf( 'MSIE 10' ) !== -1;

    isIE10 ? window.onload = handler : domready( handler );
  };

export { compose, ready, cssrelpreload };
