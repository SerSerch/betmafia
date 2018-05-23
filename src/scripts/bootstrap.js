import 'promise-polyfill/src/polyfill';
import {
  compose
} from './functional';
import {
  initModals
} from './modals';
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
  initModals,
  initSliders,
  initYoutubePlayers,
  initBackgroundVideo,
  initDeviceClass,
  initTopPanel,
  preloadCSS
);

ready( onload );
