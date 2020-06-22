function compose(...fns) {
  return (...args) => fns.reduceRight((acc, cur) => cur(acc), ...args)
}
