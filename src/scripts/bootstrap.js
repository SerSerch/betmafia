import 'promise-polyfill/src/polyfill';
import { loadCSS } from 'fg-loadcss';
import { ready, cssrelpreload, compose, initIFrames } from './common';
import { initSliders } from './sliders';

window.loadCSS = loadCSS;

const onload = compose(
  cssrelpreload,
  initSliders,
  initIFrames
);

ready( onload );
