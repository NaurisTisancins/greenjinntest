import axios from 'axios';

export const ohlcPrices = {
  bitstampEndpoint: 'https://www.bitstamp.net/api/v2/ticker/btcusd',
  coinbaseEndpoint: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
  bitfinexEndpoint: 'https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD',
};

export const tradingPairsEndpoints = {
  bitstampTradingPairs: 'https://www.bitstamp.net/api/v2/trading-pairs-info',
  bitstampSelectPair: 'https://www.bitstamp.net/api/v2/ticker',
};

export const getCurrencyPairs = async () => {
  const res = await fetch(tradingPairsEndpoints.bitstampTradingPairs);
  const pairs = await res.json();
  return pairs;
};

export const getBitstampPriceData = async () => {
  const res = await axios.get(ohlcPrices.bitstampEndpoint);
  const data = await res.data;
  return data;
};

export const getCoinbasePriceData = async () => {
  const res = await axios.get(ohlcPrices.coinbaseEndpoint);
  const data = await res.data;
  return data;
};

export const getBitfinexPriceData = async () => {
  const res = await axios.get(ohlcPrices.bitfinexEndpoint);
  const data = await res.data;
  return data;
};

export type getAllType = {
  bitstamp: string;
  coinbase: string;
  bitfinex: string;
};

export const getAllCurrencyPriceData = async () => {
  const response = await axios
    .all([
      await axios.get(ohlcPrices.bitstampEndpoint),
      await axios.get(ohlcPrices.coinbaseEndpoint),
      await axios.get(ohlcPrices.bitfinexEndpoint),
    ])
    .then(
      axios.spread((bitstampData, coinbaseData, bitfinexData) => {
        return {
          bitstamp: bitstampData.data,
          coinbase: coinbaseData.data,
          bitfinex: bitfinexData.data,
        };
      })
    )
    .catch((err) => console.log(err));
  return response;
};
