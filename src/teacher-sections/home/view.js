// @mui
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
// components
import { useSettingsContext } from 'src/components/settings';
import HomeTopStudents from './home-top-students';
import HomeWelcome from './home-welcome';
import { useAuthContext } from 'src/auth/hooks';
import ClassList, { ClassesHeader } from '../components/class';
import HomeworkList, { HomeworkHeader } from '../components/homework';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';

// router
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useEffect, useState } from 'react';
// axios
import axios, { endpoints } from 'src/utils/axios';
import { Box, Card } from '@mui/material';

// ----------------------------------------------------------------------

const top_students = [
    {
        id: 1,
        nickname: 'ریحانه اخوان',
        weekly_score: 1000,
        avatar_url: '/assets/images/avatar/avatar_4.jpg',
    },
    {
        id: 2,
        nickname: 'جواد عزتی',
        weekly_score: 980,
        avatar_url: '/assets/images/avatar/avatar_1.jpg',
    },
    {
        id: 3,
        nickname: 'محمد موسوی',
        weekly_score: 745,
        avatar_url: '/assets/images/avatar/avatar_5.jpg',
    },
];

// ----------------------------------------------------------------------

const class_list = [
    {
        id: 1,
        name: 'شقایق ۱',
        grade: 5,
        school_name: 'فرزانگان',
        image: '/assets/images/book/book_1.jpg',
        last_update: '1402/02/21',
        student_num: 23,
        progress: 20,
    },
    {
        id: 2,
        name: '۱۰۳',
        grade: 5,
        school_name: 'علامه حلی',
        image: '/assets/images/book/book_2.jpg',
        last_update: '1402/02/23',
        student_num: 16,
        progress: 90,
    },
    {
        id: 3,
        name: 'خردمندان ۲',
        grade: 5,
        school_name: 'منظومه خرد',
        image: '/assets/images/book/book_4.jpg',
        last_update: '1402/03/21',
        student_num: 23,
        progress: 70,
    },
];

// ----------------------------------------------------------------------

export default function HomeView() {
    const { user } = useAuthContext();
    const settings = useSettingsContext();
    const { enqueueSnackbar } = useSnackbar();
    const [classesList, setClassesList] = useState([]);
    const [homeworks, setHomeworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([axios.get(endpoints.teacher.get_classes_list), axios.get(endpoints.teacher.get_current_homeworks)])
            .then((response) => {
                const classList = response[0];
                const homeWorks = response[1];
                setClassesList(classList.data.slice(0, 3));
                setHomeworks(homeWorks.data.slice(0, 3));
            })
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
    }, []);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            {loading ? (
                <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LoadingScreen />
                </Box>
            ) : (
                <Grid container sx={{ mt: { xs: 0, md: 4 } }} spacing={3}>
                    <Grid
                        item
                        xs={12}
                        // md={6}
                    >
                        <HomeWelcome
                            title={` ${user?.first_name} ${user?.last_name} \n به دانیو خوش آمدید `}
                            description="دانیو سکوی هوشمند دانایی و همراه شما در طول سال تحصیلی است"
                            img={<SeoIllustration />}
                            action={
                                <Button
                                    component={RouterLink}
                                    href={paths.teacher.classes}
                                    variant="contained"
                                    color="primary"
                                    sx={{ mb: { xs: 2, md: 0 } }}
                                >
                                    کلاس‌های من
                                </Button>
                            }
                        />
                    </Grid>
                    {/* <Grid item xs={12} md={6}>
                        <HomeTopStudents title="دانش‌آموزان برتر هفته" list={top_students} />
                    </Grid> */}

                    <Grid item xs={12}>
                        <ClassesHeader />
                        {classesList.length > 0 ? (
                            <ClassList classesList={classesList} />
                        ) : (
                            <Card
                                component="div"
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                                    backdropFilter: `blur(2px)`,
                                    padding: '15px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography>کلاسی وجود ندارد</Typography>
                            </Card>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <HomeworkHeader />
                        {homeworks.length > 0 ? (
                            <HomeworkList homeworkList={homeworks} />
                        ) : (
                            <Card
                                component="div"
                                sx={{
                                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                                    backdropFilter: `blur(2px)`,
                                    padding: '15px 20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography>تکلیفی وجود ندارد</Typography>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}
