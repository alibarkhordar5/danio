// @mui
import Box from '@mui/material/Box';
// components
import StudentsTable from '../components/students-table';
import CommingSoon from '../components/coming-soon';
import { useEffect, useState } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ClassStudents({ classId, cache }) {
    const [students, setStudents] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoaidng] = useState(true);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPage, setTotalPage] = useState(1);
    const [loadingButton, setLoadingButton] = useState(false);

    const FetchStudent = (page, size) => {
        axios
            .get(endpoints.teacher.get_students_by_class(classId, page, size))
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
                    };
                });
                setTotalPage(data.total_pages);
                setStudents((prev) => {
                    const array = [...prev];
                    array.push(...students_data);
                    cache.students = array;
                    return array;
                });
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
        <Box>
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
                <StudentsTable
                    sx={{ mt: 4 }}
                    setStudents={setStudents}
                    tableData={students}
                    classId={classId}
                    addDataHandler={addDataHandler}
                    showAddButton={parseInt(totalPage) === parseInt(page) ? false : true}
                    loadingButton={loadingButton}
                    tableLabels={[
                        { id: 'name', label: 'نام و نام خانوادگی' },
                        { id: 'done_homeworks', label: 'تکالیف انجام شده' },
                        { id: 'avg_score', label: 'نمره میانگین' },
                        { id: 'options', label: 'امکانات' },
                    ]}
                />
            )}
        </Box>
    );
}
