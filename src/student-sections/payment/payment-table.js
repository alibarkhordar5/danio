import PropTypes from 'prop-types';
// @mui
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
// utils
import { toFarsiNumber } from 'src/utils/format-number-persian';
import { fPersianDate, fPersianTime } from 'src/utils/format-time';
// components
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';

// ----------------------------------------------------------------------

const tableLabels = [
  { id: 'datetime', label: 'تاریخ' },
  { id: 'price', label: 'مبلغ واریزی', align: 'center' },
  { id: 'refrence_id', label: 'شماره رهگیری', align: 'center' },
  { id: 'description', label: 'توضیحات', align: 'center' },
  { id: 'status', label: 'وضعیت', align: 'center' },
];

const DATA = [
  {
    id: 1,
    date: '1402/03/08',
    time: '08:08:00',
    refrence_id: 1234567890,
    description: 'خرید عضویت یکساله برنزی',
    price: 1000000,
    status: 'موفق',
  },
  {
    id: 2,
    date: '1402/03/08',
    time: '08:07:00',
    refrence_id: 1234567889,
    description: 'خرید عضویت یکساله برنزی',
    price: 1000000,
    status: 'ناموفق',
  },
];

// ----------------------------------------------------------------------

export default function PaymentTable() {
  const table = useTable();

  const dataInPage = DATA.slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage);

  return (
    <Card>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {dataInPage.map((row) => (
                <PaymentTableRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={DATA.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

function PaymentTableRow({ row }) {
  const { refrence_id, description, price, status, date, time } = row;
  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center', minWidth: 120 }}>
        <ListItemText
          primary={fPersianDate(date)}
          secondary={fPersianTime(time)}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell sx={{ minWidth: 120 }} align="center">
        <Typography>{toFarsiNumber(price)} ریال</Typography>
      </TableCell>

      <TableCell sx={{ minWidth: 120 }} align="center">
        {toFarsiNumber(refrence_id)}
      </TableCell>

      <TableCell sx={{ minWidth: 120 }} align="center">
        <Typography>{description}</Typography>
      </TableCell>

      <TableCell sx={{ minWidth: 100 }} align="center">
        <Label variant="soft" color={(status === 'موفق' && 'success') || 'error'}>
          {status}
        </Label>
      </TableCell>
    </TableRow>
  );
}

PaymentTableRow.propTypes = {
  row: PropTypes.object,
};
