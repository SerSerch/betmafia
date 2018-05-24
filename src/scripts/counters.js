import { on } from './dom';

const counter = Object.keys( window )
    .filter( name => name.startsWith( 'yaCounter' ))
    .map( name => window[ name ])
    .pop(),
  handler = e => {
    const { target } = e,
      element = target.closest( '[data-click-goal]' );
    if ( !element ) {
      return;
    }
    const { clickGoal } = element.dataset;
    counter.reachGoal( clickGoal );
    e.preventDefault();
  },
  init = () => on( document, 'click', handler );

export {
  init as initCounters
}
