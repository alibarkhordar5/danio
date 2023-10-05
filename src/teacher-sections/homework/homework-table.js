import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
// utils
import { toFarsiNumber } from 'src/utils/format-number-persian';
import { fPersianTime, fPersianDate } from 'src/utils/format-time';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
// components
import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/table';
import Iconify from 'src/components/iconify/iconify';
import HomeworkFeedbackDialog from './homework-feedback-dialog';
import { Box, Button } from '@mui/material';
import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

export default function HomeworkTable({
    id,
    title,
    subheader,
    tableData,
    tableLabels,
    tableHead,
    showAddButton,
    addDataHandler,
    loadingButton,
    callBack,
    getClassData,
    ...other
}) {
    const router = useRouter();
    const table = useTable();

    const dataInPage = tableData;

    return (
        <Card {...other}>
            {/* <HomeworkTableHead head={tableHead} /> */}
            <TableContainer sx={{ overflow: 'unset' }}>
                <Scrollbar>
                    <Table sx={{ minWidth: 640 }}>
                        <TableHeadCustom headLabel={tableLabels} order={table.order} orderBy={table.orderBy} />

                        <TableBody>
                            {dataInPage.map((row) => (
                                <HomeworkTableRow getClassData={getClassData} callBack={callBack} key={row.id} row={row} id={id} />
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
        </Card>
    );
}

HomeworkTable.propTypes = {
    subheader: PropTypes.string,
    tableData: PropTypes.array,
    tableLabels: PropTypes.array,
    title: PropTypes.string,
};

// ----------------------------------------------------------------------

function HomeworkTableRow({ getClassData, row, id, callBack }) {
    const [open, setOpen] = useState(false);
    const [activeStudentId, setActiveStudentId] = useState();
    const [message, setMessage] = useState('');
    const router = useRouter();

    // console.log('message', message);

    const onOpen = (id) => {
        setActiveStudentId(id);
        setOpen(true);
    };

    const onClose = () => {
        setActiveStudentId();
        setMessage('')
        setOpen(false);
    };

    return (
        <>
            <TableRow>
                <TableCell sx={{ display: 'flex', alignItems: 'center', minWidth: 20 }}>
                    <Link
                        component={RouterLink}
                        href={paths.teacher.student(row.id)}
                        sx={{ display: 'contents', color: 'inherit' }}
                    >
                        <Avatar alt={row.name} src={row.avatar_url} sx={{ mr: 2 }} />
                        <Typography variant="body1">{row.name}</Typography>
                    </Link>
                </TableCell>

                <TableCell sx={{ minWidth: 120 }} align="center">
                    {toFarsiNumber(Math.round(row.total_score))}
                </TableCell>

                <TableCell sx={{ minWidth: 200 }} align="center">
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

                <TableCell sx={{ minWidth: 100 }}>
                    {row.comment ? (
                        <Button
                            onClick={() => {
                                onOpen(row.id);
                                setMessage(row.comment);
                            }}
                            size="small"
                            variant="contained"
                        >
                            مشاهده پیام
                        </Button>
                    ) : (
                        <IconButton
                            onClick={() => {
                                setMessage('');
                                onOpen(row.id);
                            }}
                        >
                            <Iconify icon="uim:comment-plus" />
                        </IconButton>
                    )}
                </TableCell>
                <TableCell>
                    <Button
                        onClick={() => router.push(paths.teacher.studentHomework(id, row.id))}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        مشاهده وضعیت
                    </Button>
                </TableCell>
            </TableRow>
            <HomeworkFeedbackDialog
                open={open}
                onClose={onClose}
                setMeesage={setMessage}
                message={message}
                student_id={activeStudentId}
                homework_id={id}
                callBack={callBack}
                getClassData={getClassData}
            />
        </>
    );
}

HomeworkTableRow.propTypes = {
    row: PropTypes.object,
    onOpen: PropTypes.func,
};

// ----------------------------------------------------------------------

export function HomeworkTableHead({ head }) {
    const { class_name, skills, deadline } = head;
    return (
        <Stack
            spacing={2}
            justifyContent={'space-between'}
            direction={{ xs: 'column', md: 'row' }}
            sx={{
                p: 2.5,
            }}
        >
            <Typography>مباحث: {skills}</Typography>
            <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={1}>
                    <Iconify icon="solar:clock-circle-line-duotone" />
                    <Typography variant="caption">{fPersianDate(deadline)}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                    <Iconify icon="ph:chalkboard-simple" color="text.disabled" />
                    <Typography variant="caption">{class_name}</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
