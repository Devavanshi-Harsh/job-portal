import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TableSortLabel,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import companies from '../static/Companies';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  row: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  tableCell: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
    color: theme.palette.common.black,
  },
  tableHeader: {
    backgroundColor: '#45474B',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState('companyName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const getRowColor = (index: number) => {
    const colors = ['#F5F7F8', '#D0D4CA'];
    return colors[index % 2];
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCompanies = companies.sort((a, b) => {
    const orderMultiplier = order === 'asc' ? 1 : -1;
    if (orderBy === 'companyName' || orderBy === 'type' || orderBy === 'careerPortal' || orderBy === 'netWorth') {
      return a[orderBy] < b[orderBy] ? -1 * orderMultiplier : 1 * orderMultiplier;
    }
    return 0;
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="companies table">
          <TableHead>
            <TableRow>
              <TableCell className={`${classes.tableCell} ${classes.tableHeader}`}>
                <TableSortLabel
                  active={orderBy === 'companyName'}
                  direction={orderBy === 'companyName' ? order : 'asc'}
                  onClick={() => handleSort('companyName')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell className={`${classes.tableCell} ${classes.tableHeader}`}>
                <TableSortLabel
                  active={orderBy === 'type'}
                  direction={orderBy === 'type' ? order : 'asc'}
                  onClick={() => handleSort('type')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell className={`${classes.tableCell} ${classes.tableHeader}`}>
                <TableSortLabel
                  active={orderBy === 'careerPortal'}
                  direction={orderBy === 'careerPortal' ? order : 'asc'}
                  onClick={() => handleSort('careerPortal')}
                >
                  Career Portal
                </TableSortLabel>
              </TableCell>
              <TableCell className={`${classes.tableCell} ${classes.tableHeader}`}>
                <TableSortLabel
                  active={orderBy === 'netWorth'}
                  direction={orderBy === 'netWorth' ? order : 'asc'}
                  onClick={() => handleSort('netWorth')}
                >
                  Net Worth
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCompanies.map((company, index) => (
              <TableRow
                key={company.companyName}
                className={classes.row}
                style={{ backgroundColor: getRowColor(index) }}
                hover
              >
                <TableCell component="th" scope="row" className={classes.tableCell}>
                  {company.companyName}
                </TableCell>
                <TableCell className={classes.tableCell}>{company.type}</TableCell>
                <TableCell className={classes.tableCell}>
                  <Link href={company.careerPortal} target="_blank" rel="noopener" className={classes.link}>
                    {company.careerPortal}
                  </Link>
                </TableCell>
                <TableCell className={classes.tableCell}>{company.netWorth}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
      >
        Add
      </Button>
    </div>
  );
}
