import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthState } from './AuthContext';
import { CoinList } from '../config/api';

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const { user, alert, setAlert } = AuthState();
  const [currency, setCurrency] = useState('ILS');
  const [symbol, setSymbol] = useState('₪');
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user?.uid);
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        }
      });

      return () => {
        setWatchlist('');
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    if (currency === 'ILS') {
      setSymbol('₪');
    } else {
      setSymbol('$');
    }
  }, [currency]);

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));
    return data;
  };

  const { data: coins, isLoading } = useQuery('coins', fetchCoins);

  const removeCoinFromWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
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

  return (
    <Crypto.Provider
      value={{
        isLoading,
        alert,
        setAlert,
        currency,
        setCurrency,
        watchlist,
        removeCoinFromWatchlist,
        symbol,
        coins,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
