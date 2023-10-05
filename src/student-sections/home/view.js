import React, { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';
// component
import { useSettingsContext } from 'src/components/settings/context';
// hook
import { useAuthContext } from 'src/auth/hooks';
//
import HomeworkSkillList, { HomeworkHeader } from '../components/homework';
import HomeRiddle from './home-riddle';
import HomeworkActivityChart from '../components/homework-ativity-chart';
import HomeExercise from './home-exercise';
import { LoadingScreen } from 'src/components/loading-screen';

//axios
import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const TIME_LABELS2 = {
    week: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
    month: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
};

// ----------------------------------------------------------------------

export default function Overview() {
    const settings = useSettingsContext();
    const theme = useTheme();
    const { user } = useAuthContext();

    const { enqueueSnackbar } = useSnackbar();
    const [homeworkList, setHomeworkList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([axios.get(endpoints.student.get_current_homeworks)])
            .then((response) => {
                setHomeworkList(response[0].data.slice(0, 3));
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
                <>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: { xs: 3, md: 4 },
                        }}
                    >
                        سلام! به دانیو خوش اومدی &nbsp; :)
                    </Typography>

                    <Grid container spacing={{ xs: 4, md: 4 }} alignItems="stretch">
                        <Grid item xs={12} md={8}>
                            <HomeworkHeader />
                            <HomeworkSkillList homeworks={homeworkList} />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <HomeRiddle
                                description={`وقتی مینا ۱۵ ساله بود مادرش ۳۷ سال سن داشت، حالا سن مادر مینا دو برابر سن مینا است، مینا چند ساله است؟`}
                                img={
                                    user?.gender === 'female'
                                        ? '/assets/illustrations/characters/character_21.jpg'
                                        : '/assets/illustrations/characters/character_15.jpg'
                                }
                            />
                        </Grid>

                        {/* <Grid item xs={12} md={4.5} sx={{ height: '100%' }}>
                            <HomeExercise />
                        </Grid> */}

                        {/* <Grid item xs={12} md={7.5}>
                            <HomeworkActivityChart
                                title="فعالیت‌های من"
                                chart={{
                                    labels: TIME_LABELS2,
                                    colors: [
                                        theme.palette.success.main,
                                        theme.palette.error.main,
                                        theme.palette.warning.main,
                                    ],
                                    series: [
                                        {
                                            type: 'هفتگی',
                                            data: [
                                                { name: 'درست', data: [20, 34, 48, 65, 37, 48] },
                                                { name: 'غلط', data: [10, 34, 13, 26, 27, 28] },
                                                { name: 'نزده', data: [10, 14, 13, 16, 17, 18] },
                                            ],
                                        },
                                        {
                                            type: 'ماهانه',
                                            data: [
                                                {
                                                    name: 'درست',
                                                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                                                },
                                                {
                                                    name: 'غلط',
                                                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                                                },
                                                {
                                                    name: 'نزده',
                                                    data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                                                },
                                            ],
                                        },
                                    ],
                                }}
                            />
                        </Grid> */}
                    </Grid>
                </>
            )}
        </Container>
    );
}
