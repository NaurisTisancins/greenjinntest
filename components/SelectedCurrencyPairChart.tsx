import React, { FC, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { MyResponsiveLine } from './Chart';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

interface ICurrencyPairsProps {
  pairs: {
    ask: string;
    bid: string;
    high: string;
    last: string;
    low: string;
    open: string;
    open_24: string;
    percent_change_24: string;
    timestamp: string;
    volume: string;
    vwap: string;
  };
}

type ChartData = {
  id: string;
  data: {
    x: number;
    y: string;
  }[];
};

export const SelectedCurrencyPairChart: FC<ICurrencyPairsProps> = ({
  pairs,
}) => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (pairs.last) {
      setData((current: any) => {
        return [
          ...current,
          {
            id: uuidv4(),
            data: [
              {
                x: pairs.last,
                y: dayjs(pairs.timestamp),
              },
            ],
          },
        ];
      });
    }
    console.log({
      id: uuidv4(),
      data: [
        {
          x: pairs.last,
          y: dayjs(pairs.timestamp),
        },
      ],
    });
  }, [pairs.last, pairs]);

  return (
    <div className={styles.chartContainer}>
      {/* <MyResponsiveLine data={data} /> */}
    </div>
  );
};
