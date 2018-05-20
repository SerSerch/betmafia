import domready from 'domready';
import lazyframe from 'lazyframe';
import browser from 'bowser';
import { autoPlayYoutubeVideo } from './video';

const compose = ( ...fns ) => value =>
    fns.reduceRight(
      ( currentValue, fn ) => fn( currentValue ),
      value
    ),
  addClass = element => className => element.classList.add( className ),
  cssrelpreload = () => require( 'imports-loader?this=>global!../../node_modules/fg-loadcss/src/cssrelpreload.js' ),
  initIFrames = () =>
    lazyframe( '.lazyframe', {
      lazyload: true
    }),
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

export { compose, ready, cssrelpreload, initIFrames, initBackgroundVideo, initDeviceClass };
