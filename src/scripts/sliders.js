import { tns as makeSlider } from '../../node_modules/tiny-slider/src/tiny-slider.module';
import { compose } from './common';

const initFeedback = () =>
    makeSlider({
      container: '.feedback__list',
      items: 1,
      slideBy: 'page',
      lazyload: true
    }),
  init = compose( initFeedback );

export { init as initSliders };
