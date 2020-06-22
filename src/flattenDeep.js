const flattenDeep = (arrs) =>
  arrs.reduce(
    (acc, cur) =>
      Array.isArray(cur) ? [...acc, ...flattenDeep(cur)] : [...acc, cur],
    []
  )
