import domready from 'domready';
import lazyframe from 'lazyframe';
import browser from 'bowser';
import {
  autoPlayYoutubeVideo,
  lazyLoadYoutubePlayers,
  loadYoutubePlayers
} from './youtube';
import { loadCSS } from 'fg-loadcss';

const invoke = fn => fn(),
  compose = ( ...fns ) => value =>
    fns.reduceRight(
      ( currentValue, fn ) => fn( currentValue ),
      value
    ),
  curry = function ( fn ) {
    let handler;
    const args = [];

    handler = ( ...data ) => {
      if ( data.length > 0 ) {
        const argsCount = args.push( ...data );
        if ( argsCount !== fn.length ) {
          return handler;
        }
      }
      return fn.apply( this, args );
    };

    return handler;
  },
  ifElse = curry(
    ( comparator, arg1, arg2 ) => comparator ? arg1 : arg2
  ),
  hasClass = curry(
    ( element, className ) => element.classList.contains( className )
  ),
  addClass = curry(
    ( element, className ) => element.classList.add( className )
  ),
  preloadCSS = () => {
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

export { compose, ready, preloadCSS, initYoutubePlayers, initBackgroundVideo, initDeviceClass };
