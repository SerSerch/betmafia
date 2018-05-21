import { tns as makeSlider } from '../../node_modules/tiny-slider/src/tiny-slider.module';
import { compose } from './common';

const initFeedback = () =>
    makeSlider({
      container: '.feedback__list',
      items: 1,
      slideBy: 'page',
      lazyload: true,
      autoplay: true,
      loop: true,
      autoplayButton: false,
      autoplayButtonOutput: false,
      navContainer: document.getElementById( 'feedback__nav' ),
      controlsContainer: document.getElementById( 'feedback__controls' )
    }),
  init = compose( initFeedback );

export { init as initSliders };
