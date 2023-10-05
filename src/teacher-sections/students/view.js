// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import StudentsTable from '../components/students-table';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function StudentsView() {
    const settings = useSettingsContext();
    const [students, setStudents] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoaidng] = useState(true);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPage, setTotalPage] = useState(1);
    const [loadingButton, setLoadingButton] = useState(false);

    const FetchStudent = (page, size) => {
        axios
            .get(endpoints.teacher.get_students_by_class('', page, size))
            .then((response) => {
                const data = response.data;
                const students_data = data.data.map((student) => {
                    return {
                        id: student.id,
                        name: student.nickname,
                        avatar_url: '/assets/images/avatar/avatar_4.jpg',
                        done_homeworks: student.number_of_homeworks_done,
                        total_homeworks: student.number_of_homeworks,
                        avg_score: student.avg_score,
                        grade: student.grade,
                    };
                });
                setTotalPage(data.total_pages);
                setStudents((prev) => {
                    const array = [...prev];
                    array.push(...students_data);
                    return array;
                });
                setLoaidng(false);
                setLoadingButton(false);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
    };

    useEffect(() => {
        FetchStudent(page, size);
        setLoaidng(false);
        setLoadingButton(false);
    }, []);

    const addDataHandler = () => {
        setLoadingButton(true);
        FetchStudent(page + 1, size);
        setPage(page + 1);
    };
    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <LoadingScreen />
                </Box>
            ) : (
                <>
                    {' '}
                    <Typography
                        variant="h4"
                        sx={{
                            my: 2,
                        }}
                    >
                        دانش‌آموزان من
                    </Typography>
                    <StudentsTable
                        sx={{ mt: 4 }}
                        // title="دانش‌آموزان من"
                        setStudents={setStudents}
                        studentPage={true}
                        tableData={students}
                        addDataHandler={addDataHandler}
                        showAddButton={parseInt(totalPage) === parseInt(page) ? false : true}
                        loadingButton={loadingButton}
                        tableLabels={[
                            { id: 'name', label: 'نام و نام خانوادگی' },
                            { id: 'done_homeworks', label: 'تکالیف انجام شده' },
                            { id: 'avg_score', label: 'نمره میانگین', align: 'left' },
                            { id: 'options', label: 'امکانات', align: 'center' },
                        ]}
                    />{' '}
                </>
            )}
        </Container>
    );
}
