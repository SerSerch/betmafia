import 'promise-polyfill/src/polyfill';
import {
  ready,
  preloadCSS,
  compose,
  initYoutubePlayers,
  initBackgroundVideo,
  initDeviceClass
} from './common';
import { initSliders } from './sliders';

const onload = compose(
  initSliders,
  initYoutubePlayers,
  initBackgroundVideo,
  initDeviceClass,
  preloadCSS
);

ready( onload );
