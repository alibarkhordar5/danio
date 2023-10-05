import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fGrade } from 'src/utils/format-number';
import { toFarsiNumber } from 'src/utils/format-number-persian';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// components
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useTable, TableHeadCustom, TablePaginationCustom, getComparator } from 'src/components/table';
import StudentTableToolbar from './student-table-toolbar';
import { Box, Button } from '@mui/material';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const defaultFilters = {
    name: '',
    grade: [],
};

const grades = [
    { id: 4, label: 'پایه‌ی چهارم' },
    { id: 5, label: 'پایه‌ی پنجم' },
    { id: 6, label: 'پایه‌ی ششم' },
];

// ----------------------------------------------------------------------

export default function StudentsTable({
    title,
    subheader,
    tableData,
    tableLabels,
    showAddButton,
    addDataHandler,
    loadingButton,
    studentPage,
    student_id,
    ...other
}) {
    const table = useTable();

    const [filters, setFilters] = useState(defaultFilters);

    const handleFilters = useCallback(
        (name, value) => {
            table.onResetPage();
            setFilters((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        [table]
    );

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters,
    });

    const dataInPage = dataFiltered;

    return (
        <Card {...other}>
            {/* <StudentTableToolbar
                studentPage={studentPage}
                filters={filters}
                onFilters={handleFilters}
                gradeOptions={grades}
            /> */}

            <TableContainer sx={{ overflow: 'unset' }}>
                <Scrollbar>
                    <Table sx={{ minWidth: 640 }}>
                        <TableHeadCustom headLabel={tableLabels} order={table.order} orderBy={table.orderBy} />

                        <TableBody>
                            {dataInPage.map((row) => (
                                <StudentsTableRow
                                    studentPage={studentPage}
                                    key={row.id}
                                    student_id={student_id}
                                    row={row}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </Scrollbar>
            </TableContainer>
            {showAddButton && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '15px 30px',
                    }}
                >
                    <Button onClick={addDataHandler} variant="contained" color="primary" size="small">
                        {loadingButton ? (
                            'لطفا صبر کنید'
                        ) : (
                            <>
                                {' '}
                                <Iconify icon="ic:baseline-plus" sx={{ color: 'white' }} />
                                مشاهده بیشتر
                            </>
                        )}
                    </Button>
                </Box>
            )}

            {/* <TablePaginationCustom
                count={dataFiltered.length}
                page={table.page}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
            /> */}
        </Card>
    );
}

StudentsTable.propTypes = {
    subheader: PropTypes.string,
    tableData: PropTypes.array,
    tableLabels: PropTypes.array,
    title: PropTypes.string,
};

// ----------------------------------------------------------------------

function StudentsTableRow({ row, studentPage, student_id }) {
    // console.log('row', row);
    return (
        <Link
            component={RouterLink}
            href={paths.teacher.studentHomework(row.id, student_id)}
            sx={{ display: 'contents', color: 'inherit' }}
        >
            <TableRow>
                <TableCell sx={{ display: 'flex', alignItems: 'center', minWidth: 200 }}>
                    {/* <Avatar alt={row.nickname} src={row.avatar_url} sx={{ mr: 2 }} /> */}
                    {studentPage ? (
                        <ListItemText
                            primary={row.name}
                            // secondary={`پایه‌ی ${fGrade(row.grade)}`}
                            primaryTypographyProps={{ typography: 'body1' }}
                            secondaryTypographyProps={{
                                mt: 0.5,
                                component: 'span',
                                typography: 'caption',
                            }}
                        />
                    ) : (
                        <ListItemText
                            primary={row.name}
                            // secondary={`پایه‌ی ${fGrade(row.grade)}`}
                            primaryTypographyProps={{ typography: 'body1' }}
                            secondaryTypographyProps={{
                                mt: 0.5,
                                component: 'span',
                                typography: 'caption',
                            }}
                        />
                    )}
                </TableCell>
                <TableCell sx={{ minWidth: 120 }} align="left">
                    {toFarsiNumber(row?.avg_score || 0)}
                    {/* از {toFarsiNumber(row.total_homeworks)} */}
                </TableCell>
                <TableCell sx={{ minWidth: 120 }} align="left">
                    <Label
                        color={
                            row.state === 'NOT_STARTED'
                                ? 'error'
                                : row.state === 'UNDONE'
                                ? 'warning'
                                : row.state === 'DONE'
                                ? 'success'
                                : 'success'
                        }
                        sx={{ width: 'auto' }}
                    >
                        {row.state === 'NOT_STARTED'
                            ? 'شروع نکرده'
                            : row.state === 'UNDONE'
                            ? 'ناقص'
                            : row.state === 'DONE'
                            ? 'انجام شده'
                            : 'کامل شده'}
                    </Label>
                </TableCell>

                {/* <TableCell sx={{ minWidth: 120 }} align="center">
                    <Label variant="soft" color={'success'}>
                        مشاهده پروفایل
                    </Label>
                </TableCell> */}
            </TableRow>
        </Link>
    );
}

StudentsTableRow.propTypes = {
    row: PropTypes.object,
};

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
    const { name, grade } = filters;

    // const stabilizedThis = inputData.map((el, index) => [el, index]);

    // stabilizedThis.sort((a, b) => {
    //     const order = comparator(a[0], b[0]);
    //     if (order !== 0) return order;
    //     return a[1] - b[1];
    // });

    // inputData = stabilizedThis.map((el) => el[0]);

    // if (name) {
    //     inputData = inputData.filter((student) => student.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    // }

    // if (grade.length) {
    //     inputData = inputData.filter((student) => grade.includes(student.grade));
    // }

    return inputData;
}
