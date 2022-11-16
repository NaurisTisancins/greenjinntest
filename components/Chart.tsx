// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line';
import styles from '../styles/Home.module.css';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveLine = ({ data }: any) => {
  return (
    <div className={styles.chartContainer}>
      {data.length > 0 && <ResponsiveLine data={data} />};
    </div>
  );
};
