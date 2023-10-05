// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// components
import { useSettingsContext } from 'src/components/settings';
import StudentProfileCard from './student-profile-card';
import StudentHomeworkTable from './student-homework-table';
import { useEffect, useState } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { useParams } from 'src/routes/hook';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const STUDENT = {
    id: 1,
    first_name: 'امیر',
    last_name: 'محمودی',
    avatar_url: '/assets/images/avatar/avatar_5.jpg',
    cover_url: '/assets/background/overlay_3.jpg',
    grade: 5,
    school_name: 'علامه حلی',
    class_name: '۱۰۳',
    total_score: 89,
    total_answered_question: 23,
    total_correct_answer: 15,
    rank: 'خوب',
};

// ----------------------------------------------------------------------

export default function StudentView() {
    const settings = useSettingsContext();

    const [studentData, setStudentData] = useState();
    const [studentTable, setStudentTable] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoaidng] = useState(true);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPage, setTotalPage] = useState(1);
    const [loadingButton, setLoadingButton] = useState(false);

    // console.log('studentTable', studentTable);

    const FetchStudent = (page, size) => {
        axios
            .get(endpoints.teacher.get_student_detail(id, page, size))
            .then((response) => {
                const data = response.data;

                setTotalPage(data.total_pages);
                setStudentTable((prev) => {
                    const array = [...prev];
                    const newArray = [...array, ...data.data];
                    return newArray;
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

    const { id } = useParams();

    useEffect(() => {
        FetchStudent(page, size);
        axios
            .get(endpoints.teacher.get_student_profile(id))
            .then((response) => {
                const data = response.data;
                setStudentData(data);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
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
                            mt: 2,
                            mb: 4,
                        }}
                    >
                        دانش‌آموز
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <StudentProfileCard student={studentData} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <StudentHomeworkTable
                                sx={{ mt: 4 }}
                                student_id={id}
                                tableData={studentTable}
                                addDataHandler={addDataHandler}
                                showAddButton={parseInt(totalPage) === parseInt(page) ? false : true}
                                loadingButton={loadingButton}
                                tableLabels={[
                                    { id: 'name', label: 'نام تکلیف' },
                                    { id: 'done_homeworks', label: 'نمره میانگین' },
                                    { id: 'avg_score', label: 'وضعیت', align: 'left' },
                                    // { id: 'options', label: 'امکانات', align: 'center' },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
}
