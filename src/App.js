import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@material-ui/core';
import { AuthContext, CryptoContext } from './contexts';
import * as ROUTES from './constants/routes';
import { PrivateRoute } from './utils';
import {
  Signup,
  Login,
  ForgotPassword,
  NotFound,
  Home,
  Coin,
  ResetPassword,
} from './pages';
import { Header, Alert } from './components';
import { theme } from './App.styles';

const App = () => {
  return (
    <AuthContext>
      <CryptoContext>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Router>
              <Header />
              <Routes>
                <Route path={ROUTES.SIGN_UP} element={<Signup />} />
                <Route path={ROUTES.SIGN_IN} element={<Login />} />
                <Route
                  path={ROUTES.PASSWORD_FORGET}
                  element={<ForgotPassword />}
                />
                <Route
                  path={ROUTES.PASSWORD_RESET}
                  element={<ResetPassword />}
                />
                <Route
                  path={ROUTES.HOME}
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.COIN}
                  element={
                    <PrivateRoute>
                      <Coin />
                    </PrivateRoute>
                  }
                />
                <Route path="*" exact={true} element={<NotFound />} />
              </Routes>
            </Router>
            <Alert />
          </ThemeProvider>
        </StyledEngineProvider>
      </CryptoContext>
    </AuthContext>
  );
};

export default App;
