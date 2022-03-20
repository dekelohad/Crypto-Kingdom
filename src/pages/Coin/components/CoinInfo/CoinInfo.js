import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import { CryptoState } from '../../../../contexts';
import { HistoricalChart } from '../../../../config/api';
import { chartDays, options } from './data';
import { SelectButton, ProgressLoader } from '../../../../components';
import { useStyles } from './CoinInfo.styles';

const CoinInfo = ({ coin }) => {
  const { currency } = CryptoState();
  const [days, setDays] = useState(1);
  const classes = useStyles();

  const fetchHistoricData = async () => {
    if (coin) {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      return data;
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    'historicData',
    fetchHistoricData,
    {
      manual: false,
    }
  );

  const selectButtonHandler = (day) => {
    setDays(day);
    refetch();
  };

  if (isLoading) return <ProgressLoader />;

  if (isError) return <span>{error.message}</span>;

  return (
    <div className={classes.container}>
      <Line
        data={{
          labels:
            data.prices &&
            data.prices.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

          datasets: [
            {
              data: data.prices && data.prices.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: '#EEBC1D',
            },
          ],
        }}
        options={options}
      />
      <div className={classes.chartDayContainer}>
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => {
              selectButtonHandler(day.value);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </div>
    </div>
  );
};

export default CoinInfo;
