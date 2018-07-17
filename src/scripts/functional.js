const id = value => value,
  compose = ( ...fns ) => value =>
    fns.reduceRight(
      ( currentValue, fn ) => fn( currentValue ),
      value
    ),
  curry = function ( fn ) {
    let handler;
    const args = [];

    handler = ( ...data ) => {
      const restCount = fn.length - args.length,
        restArgs = data.slice( 0, restCount );

      if ( restArgs.length > 0 ) {
        const argsCount = args.length + restArgs.length;
        if ( argsCount < fn.length ) {
          args.push( ...restArgs );
          return handler;
        }
      }
      return fn.apply( this, [ ...args, ...restArgs ]);
    };

    return handler;
  },
  invoke = fn => fn(),
  ifElse = curry(
    ( comparator, arg1, arg2 ) => comparator ? arg1 : arg2
  );

export {
  compose,
  curry,
  invoke,
  ifElse,
  id
}
