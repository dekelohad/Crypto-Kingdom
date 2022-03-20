import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
} from '@material-ui/core';
import { AuthState, CryptoState } from '../../contexts';
import { UserSidebar } from '../../components';
import { styles } from './Header.styles';

const Header = () => {
  const { user } = AuthState();
  const { currency, setCurrency } = CryptoState();
  return (
    <>
      {user ? (
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <span variant="h6" style={styles.title}>
                <Link to="/home">Crypto Kingdom</Link>
              </span>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={styles.select}
              >
                <MenuItem value={'USD'}>
                  <ReactCountryFlag
                    style={styles.selectCuntryFlag}
                    countryCode="US"
                    svg
                  />
                  <span>USD</span>
                </MenuItem>
                <MenuItem value={'ILS'}>
                  <ReactCountryFlag
                    style={styles.selectCuntryFlag}
                    countryCode="IL"
                    svg
                  />
                  <span>ILS</span>
                </MenuItem>
              </Select>
              <UserSidebar />
            </Toolbar>
          </Container>
        </AppBar>
      ) : null}
    </>
  );
};

export default Header;
