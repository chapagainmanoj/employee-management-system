export const deepFlatten = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));

export const parseRoute = (routes, link = "routes") => {
  return routes
    .map((item) => {
      let nnav = Object.assign({}, item);
      if (Array.isArray(nnav[link])) {
        delete nnav[link];
        return [nnav, ...parseRoute(item[link])];
      } else {
        return item;
      }
    })
    .filter((item) =>
      item.hasOwnProperty("accessible") ? item.accessible : true
    );
};
