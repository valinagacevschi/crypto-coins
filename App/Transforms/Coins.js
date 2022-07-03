import camelcaseKeys from 'camelcase-keys';

const excludes = [
  // 'MKR', 'CVC', 'TRX', 'DNT', 'LOOM', 'DAI', 'ZEC', 'ZIL', 'MANA', 'BSV',
  // 'USDC', 'VET', 'BNB', 'XMR', 'BTG', 'TUSD', 'ONT', 'ZRX', 'LINK', 'BCD', 'ICX',
  // 'NANO', 'PAX',
  'ADA', 'MIOTA', 'XLM', 'QTUM', 'LSK', 'HSR', 'PPT', 'ARK', 'PAY'
];

export const formatCoin = item => {
  const vol = item['24h_volume_usd'];
  delete item['24h_volume_usd'];
  item.volumeUsd = vol;
  item = camelcaseKeys(item, { deep: true });

  item.marketCapUsd = parseFloat(item.marketCapUsd);
  item.maxSupply = parseFloat(item.maxSupply) || 0;
  item.percentChange1h = parseFloat(item.percentChange1h);
  item.percentChange24h = parseFloat(item.percentChange24h);
  item.priceBtc = parseFloat(item.priceBtc);
  item.priceUsd = parseFloat(item.priceUsd); 
  item.totalSupply = parseFloat(item.totalSupply);
  item.volumeUsd = parseFloat(item.volumeUsd);

  return item;
};

export default data => [...data].map(item => formatCoin(item))
  .filter(item => excludes.indexOf(item.symbol) < 0);
