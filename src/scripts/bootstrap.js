import 'promise-polyfill/src/polyfill';
import { loadCSS } from 'fg-loadcss';
import {
  ready,
  cssrelpreload,
  compose,
  initIFrames,
  initBackgroundVideo,
  initDeviceClass
} from './common';
import { initSliders } from './sliders';

window.loadCSS = loadCSS;

const onload = compose(
  initSliders,
  initIFrames,
  initBackgroundVideo,
  initDeviceClass,
  cssrelpreload
);

ready( onload );
