// general imports
import { useState, useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// custom components
import { useSettingsContext } from 'src/components/settings';
import ClassList from '../components/class';
import { useAuthContext } from 'src/auth/hooks';
import axios, { endpoints } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { useNavigate } from 'react-router';
import { fGrade } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ClassesView() {
    const router = useRouter();
    const settings = useSettingsContext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { user } = useAuthContext();

    const [classesList, setClassesList] = useState([]);

    useEffect(() => {
        axios
            .get(endpoints.teacher.get_classes_list)
            .then((response) => {
                if (response.data.length === 1) {
                    const classData = response.data[0];
                    navigate(paths.teacher.class(classData.id), {
                        state: {
                            name: classData?.name,
                            school_name: classData?.school_name,
                            grade: fGrade(classData?.grade),
                        },
                    });
                    // router.push(paths.teacher.class(classData));
                }
                setClassesList(response.data);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
    }, []);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Typography
                variant="h4"
                sx={{
                    mt: 2,
                    mb: 4,
                }}
            >
                کلاس‌های من
            </Typography>
            <ClassList classesList={classesList} />
        </Container>
    );
}
