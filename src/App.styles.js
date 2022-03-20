import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
  typography: {
    fontFamily: `"Montserrat","Arial", "Helvetica", "sans-serif"`,
    fontWeightRegular: 400,
  },
});
