import domready from 'domready';
import { tns } from "../../node_modules/tiny-slider/src/tiny-slider.module"

const compose = ( ...fns ) => value =>
    fns.reduceRight(
      ( currentValue, fn ) => fn( currentValue ),
      value
    ),
  ready = () => {
    const isIE10 = navigator.appVersion.indexOf( 'MSIE 10' ) !== -1;

    return isIE10 ? handler => window.onload = handler : domready;
  };

export { compose, ready };
