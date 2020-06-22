function curry(fn) {
  let ctx = this
  function inner(...args) {
    if (args.length === fn.length) return fn.call(ctx, ...args)
    return (...innerArgs) => inner.call(ctx, ...args, ...innerArgs)
  }
  return inner
}
