import React, { FC } from 'react';

interface ICurrencyPAirButtonProp {
  title: string;
}

export const CurrencyPairButton: FC<ICurrencyPAirButtonProp> = ({ title }) => {
  return <div>{title}</div>;
};
