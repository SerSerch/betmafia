import { curry } from 'ramda';

const hasClass = curry(
    ( element, className ) => element.classList.contains( className )
  ),
  addClass = curry(
    ( element, className ) => element.classList.add( className )
  ),
  removeClass = curry(
    ( element, className ) => element.classList.remove( className )
  ),
  attr = curry(
    ( element, name ) => element.getAttribute( name )
  ),
  on = curry(
    ( element, event, handler ) => element.addEventListener( event, handler )
  );

export {
  hasClass,
  addClass,
  removeClass,
  attr,
  on
}
