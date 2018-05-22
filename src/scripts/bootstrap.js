import 'promise-polyfill/src/polyfill';
import {
  compose
} from './functional';
import {
  initTopPanel
} from './top-panel';
import {
  ready,
  preloadCSS,
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
  initTopPanel,
  preloadCSS
);

ready( onload );
