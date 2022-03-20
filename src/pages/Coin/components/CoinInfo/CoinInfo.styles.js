import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
  CircularProgress: {
    color: 'gold',
  },
  chartDayContainer: {
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
}));
