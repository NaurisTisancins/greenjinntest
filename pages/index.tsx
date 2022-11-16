import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import {
  getAllCurrencyPriceData,
  getAllType,
  getCurrencyPairs,
} from '../requests';
import { AverageTickerValues } from '../components/AverageTickerValues';
import { CurrencyPairs } from '../components/CurrencyPairs';

// export async function getServerSideProps() {

//   return {
//     props: {
//       // data: JSON.parse(),
//       bitstamp: data?.bitstamp,
//       coinbase: data?.coinbase,
//       bitfinex: data?.bitfinex,
//     },
//   };
// }

export async function getStaticProps(context: any) {
  console.log(JSON.stringify(context, null, 2));
  const pairs = await getCurrencyPairs();
  const data: getAllType | void = await getAllCurrencyPriceData();
  const { req, res } = context;
  console.log(req, res);
  return {
    props: {
      pairs,
      bitstamp: data?.bitstamp,
      coinbase: data?.coinbase,
      bitfinex: data?.bitfinex,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  };
}

export default function Home({ pairs, bitstamp, coinbase, bitfinex }: any) {
  const [priceData, setPriceData] = useState({
    bitstamp: 0,
    coinbase: 0,
    bitfinex: 0,
  });
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
  }, [bitstamp, coinbase, bitfinex]);
  return (
    <div className={styles.appContainer}>
      <AverageTickerValues data={priceData} />
      <CurrencyPairs pairs={pairs} />
    </div>
  );
}
