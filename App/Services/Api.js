import apisauce from 'apisauce';

const GDAX = 'https://api.gdax.com/';
const COIN = 'https://api.coinmarketcap.com/v1/';
// our "constructor"
const create = (baseURL = GDAX) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  });

  const getProducts = () => api.get('products/');

  const getAllCoins = () => {
    api.setBaseURL(COIN);
    const response = api.get('ticker/');
    api.setBaseURL(GDAX);
    return response;
  };

  return {
    getProducts,
    getAllCoins,
  };
};

export default { create };
