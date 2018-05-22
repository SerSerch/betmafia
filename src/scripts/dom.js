import {
  curry
} from './functional';

const hasClass = curry(
    ( element, className ) => element.classList.contains( className )
  ),
  addClass = curry(
    ( element, className ) => element.classList.add( className )
  ),
  on = curry(
    ( element, event, handler ) => element.addEventListener( event, handler )
  );

export {
  hasClass,
  addClass,
  on
}
