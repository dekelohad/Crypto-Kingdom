import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import AliceCarousel from 'react-alice-carousel';
import { CryptoState } from '../../../../../contexts/CryptoContext';
import { TrendingCoins } from '../../../../../config/api';
import { StringUtils } from '../../../../../utils';
import { ProgressLoader } from '../../../../../components';
import 'react-alice-carousel/lib/alice-carousel.css';
import { styles } from './Carousel.styles';

const Carousel = () => {
  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    return data;
  };

  const { data, error, isError, isFetching } = useQuery(
    'trendingCoins',
    fetchTrendingCoins
  );

  const items = data?.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <div
        style={styles.carouselItem}
        onClick={() => {
          navigate(`/coins/${coin.id}`);
        }}
      >
        <img src={coin?.image} alt={coin.name} style={styles.carouselImage} />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
              fontWeight: 500,
            }}
          >
            {profit && '+'}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={styles.carouselCoinPrice}>
          {symbol}{' '}
          {StringUtils.numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  if (isFetching) return <ProgressLoader />;

  if (isError) return <span>{error.message}</span>;

  return (
    <div style={styles.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
