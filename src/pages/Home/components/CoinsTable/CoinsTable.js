import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TableCell,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { CryptoState } from '../../../../contexts/CryptoContext';
import { StringUtils } from '../../../../utils';
import { ProgressLoader } from '../../../../components';
import { useStyles } from './CoinsTable.styles';

const CoinsTable = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { symbol, coins, isFetching, error, isError } = CryptoState();

  const handleSearch = () => {
    return (
      coins &&
      coins.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };

  if (isFetching) return <ProgressLoader />;

  if (isError) return <span>{error.message}</span>;

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        className={classes.searchBarTextPlaceholder}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                <TableCell
                  className={classes.tableCellFirst}
                  key={head}
                  align={head === 'Coin' ? 'left' : 'right'}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((row) => {
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    onClick={() => navigate(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableCellSecond}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        className={classes.tableCellImage}
                      />
                      <div className={classes.tableCellCoinNameContainer}>
                        <span className={classes.tableCellCoinNameAcronyms}>
                          {row.symbol}
                        </span>
                        <span className={classes.tableCellCoinName}>
                          {row.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol}{' '}
                      {StringUtils.numberWithCommas(
                        row.current_price.toFixed(2)
                      )}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                        fontWeight: 500,
                      }}
                      className={classes.tableCellprice}
                    >
                      {profit && '+'}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol}{' '}
                      {StringUtils.numberWithCommas(
                        row.market_cap.toString().slice(0, -6)
                      )}
                      M
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={parseInt((handleSearch()?.length / 10).toFixed(0))}
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};

export default CoinsTable;
