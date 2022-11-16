import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import {
  getAllCurrencyPriceData,
  getAllType,
  getCurrencyPair,
} from '../requests';
import { AverageTickerValues } from '../components/AverageTickerValues';
import { CurrencyPairs, tradingPairs } from '../components/CurrencyPairs';
import { useRouter } from 'next/router';

export async function getStaticProps(context: any) {
  const pair = context.params.pair;
  // const pairs = await getCurrencyPair(pair);
  const data: getAllType | void = await getAllCurrencyPriceData();
  return {
    props: {
      pair,
      bitstamp: data?.bitstamp,
      coinbase: data?.coinbase,
      bitfinex: data?.bitfinex,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export const getStaticPaths = async () => {
  const paths = tradingPairs.map((pair: any) => {
    return {
      params: { pair: pair.value.toLowerCase().toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export default function Home({
  pair,

  bitstamp,
  coinbase,
  bitfinex,
}: any) {
  const [pairs, setPairs] = useState({});
  const [priceData, setPriceData] = useState({
    bitstamp: 0,
    coinbase: 0,
    bitfinex: 0,
  });

  useEffect(() => {
    const handler = setInterval(async () => {
      const pairValues = await getCurrencyPair(pair);
      console.log(pairValues);
      setPairs(() => {
        return pairValues;
      });
    }, 10000);
    return () => {
      clearTimeout(handler);
    };
  }, []);

  useEffect(() => {
    if (bitstamp.last) {
      setPriceData((current) => {
        return {
          ...current,
          bitstamp: Number(bitstamp.last),
        };
      });
    }
    if (coinbase) {
      setPriceData((current) => {
        return {
          ...current,
          coinbase: Number(coinbase.data.rates.USD),
        };
      });
    }
    if (bitfinex) {
      setPriceData((current) => {
        return {
          ...current,
          bitfinex: Number(bitfinex['0'][1]),
        };
      });
    }
    if (pairs) console.log(pairs);
  }, [bitstamp, coinbase, bitfinex]);

  return (
    <div className={styles.appContainer}>
      <AverageTickerValues data={priceData} />
      {pairs && <CurrencyPairs pairs={pairs} />}
    </div>
  );
}
