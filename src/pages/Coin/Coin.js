import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import ReactHtmlParser from 'react-html-parser';
import { Button, Typography } from '@material-ui/core';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthState, CryptoState } from '../../contexts';
import { SingleCoin } from '../../config/api';
import { StringUtils } from '../../utils';
import { ProgressLoader } from '../../components';
import { CoinInfo } from './components';
import { useStyles } from './Coin.styles';

const CoinPage = () => {
  const { id } = useParams();
  const { user, setAlert } = AuthState();
  const { currency, symbol, watchlist, removeCoinFromWatchlist } =
    CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    return data;
  };

  const {
    data: coin,
    error,
    isError,
    isFetching,
  } = useQuery('Coin', fetchCoin);

  const inWatchlist = watchlist.includes(coin?.id);
  const classes = useStyles({ inWatchlist });

  const addToWatchlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  if (isFetching) return <ProgressLoader />;

  if (isError) return <span>{error.message}</span>;

  return (
    <div className={classes.container}>
      <>
        <div className={classes.sidebar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            className={classes.sidebarImage}
          />
          <Typography variant="h3" className={classes.heading}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            {ReactHtmlParser(coin?.description.en.split('. ')[0])}.
          </Typography>
          <div className={classes.marketData}>
            <span className={classes.headingContainer}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" className={classes.heading}>
                {StringUtils.numberWithCommas(coin?.market_cap_rank || 0)}
              </Typography>
            </span>
            <span className={classes.headingContainer}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" className={classes.heading}>
                {symbol}{' '}
                {StringUtils.numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span className={classes.headingContainer}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" className={classes.heading}>
                {symbol}{' '}
                {StringUtils.numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
            {user && (
              <Button
                variant="outlined"
                style={{
                  backgroundColor: inWatchlist ? '#ff0000' : '#EEBC1D',
                }}
                className={classes.button}
                onClick={
                  inWatchlist
                    ? () => removeCoinFromWatchlist(coin)
                    : addToWatchlist
                }
              >
                {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </Button>
            )}
          </div>
        </div>
        <CoinInfo coin={coin} />
      </>
    </div>
  );
};

export default CoinPage;
