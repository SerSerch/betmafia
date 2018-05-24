import { curry } from 'ramda';

const hasClass = curry(
    ( element, className ) => element.classList.contains( className )
  ),
  addClass = curry(
    ( element, className ) => element.classList.add( className )
  ),
  children = curry(
    ( element, selector ) => element.querySelectorAll( selector )
  ),
  child = curry(
    ( element, selector ) => element.querySelector( selector )
  ),
  closest = curry(
    ( element, selector ) => element.closest( selector )
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
  child,
  children,
  closest,
  on
}
