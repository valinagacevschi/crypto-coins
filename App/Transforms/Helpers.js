import _ from 'lodash';
import * as d3 from 'd3';

export const chartValues = (prices) => {
  const products = Object.values(prices);
  // const keys = Object.keys(prices);

  if (!products.length) {
    return [];
  }

  const chunked = _.fromPairs(products.map(({ id, values }) => 
    [id, 
      _.groupBy(values, val => {
        let t = new Date().getTime();
        if (val) {
          const c = val.time;
          t = c.getTime();
        } 
        return Math.round(t / 3000) * 3000;
      })]
  ));

  const [t0, t1] = d3.extent(
    Object.values(chunked)
      .reduce((arr, p) => arr.concat(Object.keys(p)), [])
      .map(t => new Date(Number(t)))
  );

  return d3.timeSeconds(t0, t1, 3)
    .map(t => _.fromPairs(
      Object.keys(chunked)
        .map(k => [k, (chunked[k][t.getTime()] || []).length])
        .concat([['time', t]])
    ));
};
