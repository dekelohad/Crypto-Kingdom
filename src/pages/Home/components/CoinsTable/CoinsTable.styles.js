import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    textAlign: 'center',
  },
  title: {
    margin: 18,
  },
  searchBarTextPlaceholder: {
    marginBottom: 20,
    width: '100%',
  },
  tableHead: {
    backgroundColor: '#EEBC1D',
  },
  tableCellFirst: {
    color: 'black',
    fontWeight: '700',
  },
  tableCellSecond: {
    display: 'flex',
    gap: 15,
  },
  tableCellImage: {
    marginBottom: 10,
    height: 50,
  },
  tableCellCoinNameContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  tableCellCoinNameAcronyms: {
    textTransform: 'uppercase',
    fontSize: 22,
  },
  tableCellCoinName: {
    color: 'darkGray',
  },
  row: {
    backgroundColor: '#16171a',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'gold',
    },
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'gold',
    },
    padding: 20,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});
