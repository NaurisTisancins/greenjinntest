import React, { FC, useMemo } from 'react';
import styles from '../styles/Home.module.css';

interface IAverageValuesProps {
  data: { bitstamp: number; coinbase: number; bitfinex: number };
}

export const AverageTickerValues: FC<IAverageValuesProps> = ({ data }) => {
  const { bitfinex, coinbase, bitstamp } = data;
  const getAverageBitcoinPrice = useMemo(() => {
    return (bitstamp + coinbase + bitfinex) / 3;
  }, [bitfinex, coinbase, bitstamp]);
  return (
    <div className={styles.appContainer}>
      {getAverageBitcoinPrice !== 0 ? (
        <div>{getAverageBitcoinPrice}</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
