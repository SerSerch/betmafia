import domready from 'domready';
import lazyframe from 'lazyframe';
import browser from 'bowser';
import {
  compose,
  invoke,
  ifElse,
} from './functional';
import {
  addClass,
  hasClass,
} from './dom';
import {
  autoPlayYoutubeVideo,
  lazyLoadYoutubePlayers,
  loadYoutubePlayers
} from './youtube';
import { loadCSS } from 'fg-loadcss';

const preloadCSS = () => {
    window.loadCSS = loadCSS;
    require( 'imports-loader?this=>global!../../node_modules/fg-loadcss/src/cssrelpreload.js' )
  },
  initYoutubePlayers = () => invoke( ifElse(
    hasClass( document.documentElement, 'device_desktop' ),
    lazyLoadYoutubePlayers,
    loadYoutubePlayers
  )),
  initBackgroundVideo = () =>
    document
      .querySelectorAll( '.device_desktop .youtube-video' )
      .forEach( autoPlayYoutubeVideo ),
  initDeviceClass = () =>
    [
      browser.mobile && 'device_mobile',
      browser.tablet && 'device_tablet',
      ( !browser.tablet && !browser.mobile ) && 'device_desktop'
    ].filter( c => c )
      .forEach( addClass( document.documentElement )),
  ready = handler => {
    const ltIE10 = browser.msie && browser.version <= 11;

    ltIE10 ? window.onload = handler : domready( handler );
  };

export { ready, preloadCSS, initYoutubePlayers, initBackgroundVideo, initDeviceClass };
