import 'promise-polyfill/src/polyfill';
import { loadCSS } from 'fg-loadcss';
import { ready } from './common';

window.loadCSS = loadCSS;

const onload = () => {
  require( 'imports-loader?this=>global!../../node_modules/fg-loadcss/src/cssrelpreload.js' );
};

ready( onload );
