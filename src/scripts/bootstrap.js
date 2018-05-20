import 'promise-polyfill/src/polyfill';
import { loadCSS } from 'fg-loadcss';
import {
  ready,
  cssrelpreload,
  compose,
  initIFrames,
  initBackgroundVideo
} from './common';
import { initSliders } from './sliders';

window.loadCSS = loadCSS;

const onload = compose(
  cssrelpreload,
  initSliders,
  initIFrames,
  initBackgroundVideo
);

ready( onload );
