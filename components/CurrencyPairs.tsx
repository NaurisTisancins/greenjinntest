import React, { FC, MouseEventHandler } from 'react';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import axios from 'axios';
import { CurrencyPairButton } from './CurrencyPairButton';
import { SelectedCurrencyPairChart } from './SelectedCurrencyPairChart';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

interface ICurrencyPairsProps {
  pairs: any;
}

export const tradingPairs = [
  { name: 'matic', value: 'MATICUSD' },
  { name: 'bitcoin', value: 'BTCUSD' },
  { name: 'cardano', value: 'ADAUSD' },
  { name: 'ethereum', value: 'ETHUSD' },
  { name: 'litecoin', value: 'LRCUSD' },
  { name: 'xrp', value: 'XRPUSD' },
  { name: 'sushi', value: 'SUSHIUSD' },
  { name: 'ftt', value: 'FTTUSD' },
];

export const CurrencyPairs: FC<ICurrencyPairsProps> = ({ pairs }) => {
  const router = useRouter();
  const handleClick = (title: string) => {
    router.push(title);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pairButtonContainer}>
        {tradingPairs.map((pairTitle) => {
          const id = uuidv4();
          return (
            <div
              className={styles.currencyPairButton}
              key={id}
              onClick={() => handleClick(pairTitle.value.toLowerCase())}
            >
              {pairTitle.value}
            </div>
          );
        })}
      </div>
      <SelectedCurrencyPairChart pairs={pairs} />
    </div>
  );
};
