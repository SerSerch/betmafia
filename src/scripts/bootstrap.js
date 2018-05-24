import 'promise-polyfill/src/polyfill';
import { compose } from 'ramda';
import { initModals } from './modals';
import { initCounters } from './counters';
import { initTopPanel } from './top-panel';
import { initAjaxForms } from './ajax-forms';
import {
  ready,
  preloadCSS,
  initYoutubePlayers,
  initBackgroundVideo,
  initDeviceClass
} from './common';
import { initSliders } from './sliders';

const onload = compose(
  initAjaxForms,
  initCounters,
  initModals,
  initSliders,
  initYoutubePlayers,
  initBackgroundVideo,
  initDeviceClass,
  initTopPanel,
  preloadCSS
);

ready( onload );
