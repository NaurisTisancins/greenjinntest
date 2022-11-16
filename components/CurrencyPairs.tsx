import React, { FC } from 'react';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import axios from 'axios';
import { CurrencyPairButton } from './CurrencyPairButton';

interface ICurrencyPairsProps {
  pairs: any;
}

export const tradingPairs = [
  { name: 'matic', value: 'MATIC/USD' },
  { name: 'bitcoin', value: 'BTC/USD' },
  { name: 'cardano', value: 'ADA/USD' },
  { name: 'ethereum', value: 'ETH/USD' },
  { name: 'litecoin', value: 'LRC/USD' },
  { name: 'xrp', value: 'XRP/USD' },
  { name: 'sushi', value: 'SUSHI/USD' },
  { name: 'ftt', value: 'FTT/USD' },
];

export const CurrencyPairs: FC<ICurrencyPairsProps> = ({ pairs }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pairButtonContainer}>
        {tradingPairs.map((pairTitle) => {
          return (
            <div className={styles.currencyPairButton} key={pairTitle.name}>
              {pairTitle.value}
            </div>
          );
        })}
      </div>
      <div className={styles.chartContainer}></div>
    </div>
  );
};
