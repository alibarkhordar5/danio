import { useEffect, useState } from 'react';
import HomeworkTable from './homework-table';
import axios, { endpoints } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { Box } from '@mui/material';
import { LoadingScreen } from 'src/components/loading-screen';

const Index = ({ homeworkId, cache, getClassData }) => {
    const [students, setStudents] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoaidng] = useState(true);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPage, setTotalPage] = useState(1);
    const [loadingButton, setLoadingButton] = useState(false);

    const FetchStudent = (page, size) => {
        axios
            .get(endpoints.teacher.get_students_by_homework(homeworkId, page, size))
            .then((response) => {
                const data = response.data;
                const students_data = data.data.map((student) => {
                    return {
                        id: student.id,
                        name: student.nickname,
                        avatar_url: '/assets/images/avatar/avatar_4.jpg',
                        comment: student.comment,
                        total_score: student.avg_score,
                        state: student.state,
                    };
                });
                setTotalPage(data.total_pages);
                setStudents([...students_data]);
                setLoaidng(false);
                setLoadingButton(false);
                cache.students_size = size;
                cache.students_page = page;
                cache.students_totalPage = data.total_pages;
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
    };

    const callBack = () => FetchStudent(page, size);

    useEffect(() => {
        if (!cache['students']) {
            FetchStudent(page, size);
        } else {
            setStudents(cache.students);
            setPage(cache.students_page);
            setSize(cache.students_size);
            setTotalPage(cache.students_totalPage);
            setLoaidng(false);
            setLoadingButton(false);
        }
    }, []);

    const addDataHandler = () => {
        setLoadingButton(true);
        FetchStudent(page + 1, size);
        setPage(page + 1);
    };
    return (
        <>
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
                <HomeworkTable
                    sx={{ mt: 4 }}
                    id={homeworkId}
                    // tableHead={{
                    //     class_name: 'شقایق',
                    //     skills: 'اعداد اعشاری، تقریب',
                    //     deadline: '1402/02/09',
                    // }}
                    addDataHandler={addDataHandler}
                    showAddButton={parseInt(totalPage) === parseInt(page) ? false : true}
                    tableData={students}
                    loadingButton={loadingButton}
                    callBack={callBack}
                    getClassData={getClassData}
                    tableLabels={[
                        { id: 'name', label: 'نام و نام خانوادگی' },
                        { id: 'total_score', label: 'نمره کامل', align: 'center' },
                        { id: 'state', label: 'وضعیت', align: 'center' },
                        { id: 'comment', label: 'پیام' },
                        { id: 'show_status', label: '' },
                    ]}
                />
            )}
        </>
    );
};

export default Index;
