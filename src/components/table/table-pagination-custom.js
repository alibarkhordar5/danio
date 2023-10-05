import PropTypes from 'prop-types';
// @mui
import TablePagination from '@mui/material/TablePagination';
// util
import { toFarsiNumber } from 'src/utils/format-number-persian';

// ----------------------------------------------------------------------

export default function TablePaginationCustom({
  rowsPerPageOptions = [
    { label: '۵', value: 5 },
    { label: '۱۰', value: 10 },
    { label: '۲۰', value: 20 },
    { label: '۵۰', value: 50 },
    { label: 'همه', value: -1 },
  ],
  sx,
  ...other
}) {
  return (
    <TablePagination
      labelRowsPerPage={'تعداد به ازای هر صفحه'}
      rowsPerPageOptions={rowsPerPageOptions}
      labelDisplayedRows={({ from, to, count }) => {
        return '' + toFarsiNumber(to) + '-' + toFarsiNumber(from) + ' از ' + toFarsiNumber(count) + ' تا ';
      }}
      component="div"
      {...other}
      sx={{
        borderTopColor: 'transparent',
      }}
    />
  );
}

TablePaginationCustom.propTypes = {
  dense: PropTypes.bool,
  onChangeDense: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  sx: PropTypes.object,
};
