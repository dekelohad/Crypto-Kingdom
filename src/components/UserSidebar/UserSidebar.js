import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { Avatar } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthState, CryptoState } from '../../contexts';
import * as ROUTES from '../../constants/routes';
import { StringUtils } from '../../utils';
import { ProgressLoader, LoadingButton } from '../../components';
import { styles } from './UserSidebar.styles';

export const UserSidebar = ({ style }) => {
  const navigate = useNavigate();
  const { user, logout } = AuthState();
  const { isLoading, coins, symbol, watchlist, removeCoinFromWatchlist } =
    CryptoState();
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const logOutUser = () => {
    logout();
    navigate(ROUTES.SIGN_IN);
  };

  return (
    <div style={style}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={styles.avatar}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div style={styles.container}>
              <div style={styles.profile}>
                <Avatar
                  onClick={toggleDrawer(anchor, false)}
                  style={styles.profilePicture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span style={styles.profileName}>
                  {user.displayName || user.email}
                </span>
                <div style={styles.watchlist}>
                  <span style={styles.watchlistTitle}>Watchlist</span>
                  {isLoading ? (
                    <ProgressLoader />
                  ) : (
                    coins.map((coin) => {
                      return (
                        watchlist.includes(coin.id) && (
                          <div
                            style={styles.watchlistCoinContainer}
                            key={coin.id}
                          >
                            <span>{coin.name}</span>
                            <span style={styles.watchlistCoinInnerContainer}>
                              {symbol}{' '}
                              {StringUtils.numberWithCommas(
                                coin.current_price.toFixed(2)
                              )}
                              <DeleteIcon
                                fontSize="small"
                                style={styles.watchlistDeleteIcon}
                                onClick={() => removeCoinFromWatchlist(coin)}
                              />
                            </span>
                          </div>
                        )
                      );
                    })
                  )}
                </div>
              </div>
              <LoadingButton
                text={'Log Out'}
                onClick={logOutUser}
                loading={false}
              />
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserSidebar;
