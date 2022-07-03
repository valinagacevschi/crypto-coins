import camelcaseKeys from 'camelcase-keys';

const ids = ['BTC-USD', 'ETH-USD', 'LTC-USD', 
'BTC-EUR', 'ETH-EUR', 'LTC-EUR', 'ETH-BTC', 'LTC-BTC'];

export const formatProduct = item => camelcaseKeys(item, { deep: true });
export default data => [...data]
  .filter((item) => item.quote_currency !== 'GBP')
  .map(item => formatProduct(item))
  .sort((a, b) => (ids.indexOf(a.id) - ids.indexOf(b.id)));
