// @mui
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
import { alpha, useTheme } from '@mui/material/styles';
//
import HomeworkSkillList from '../components/homework';
import TeachersMessage from './homework-teachers-message';
import HomeworkAnalytics from './homework-analytics';
import { Avatar, Box, Card, CardContent, Divider, ListItemText, Tooltip } from '@mui/material';
import { toFarsiNumber } from 'src/utils/format-number-persian';
import Iconify from 'src/components/iconify/iconify';
import Label from 'src/components/label/label';
import { useParams, useRouter } from 'src/routes/hook';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';
import { paths } from 'src/routes/paths';
import BookingWidgetSummary from 'src/components/summeryWidget/booking-widget-summary';
import { AuthContext } from 'src/auth/context/jwt';
import { fGrade } from 'src/utils/format-number';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function HomeworkView() {
    const theme = useTheme();
    const settings = useSettingsContext();
    const router = useRouter();
    const { homeworkId } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [classData, setClassData] = useState();
    const [report, setReport] = useState();
    const [skills, setSkills] = useState([]); // or maybe a list
    const { user } = useAuthContext();

    useEffect(() => {
        Promise.all([
            axios.get(endpoints.student.get_homework_skills(homeworkId)),
            axios.get(endpoints.student.get_homework_report(homeworkId)),
        ])
            .then((response) => {
                const skills = response[0].data;
                setSkills(skills || []);
                const report = response[1].data;
                setReport(report);
            })
            .then(() => {
                setLoading(false);
            })
            .catch((err) => {
                enqueueSnackbar(err.detail || err.message || 'خطا در دریافت اطلاعات', { variant: 'error' });
            });
    }, []);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Card sx={{ cursor: 'pointer', mb: 5 }}>
                <Stack
                    sx={{ p: 3, pb: 2 }}
                    display={'flex'}
                    flexDirection={{ xs: 'column', md: 'row' }}
                    alignItems={{ xs: 'flex-start', md: 'flex-end' }}
                    justifyContent={'space-around'}
                >
                    <Stack
                        direction={'column'}
                        sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
                        spacing={2}
                    >
                        {/* <Avatar
                            alt={report?.name}
                            src={'/assets/images/book/book_1.jpg'}
                            variant="rounded"
                            sx={{ width: 64, height: 64, mb: 2 }}
                        /> */}

                        <img src={report?.icon} alt="homework" width="64" height="64" style={{ marginBottom: 2 }} />
                        <Box>
                            <ListItemText
                                sx={{ mb: 1 }}
                                primary={report?.name}
                                secondary={` تاریخ شروع تمرین: ${report?.start_date?.replaceAll('-', '/')}`}
                                primaryTypographyProps={{
                                    typography: 'subtitle1',
                                }}
                                secondaryTypographyProps={{
                                    mt: 1,
                                    component: 'span',
                                    typography: 'caption',
                                    color: 'text.disabled',
                                }}
                            />
                            <ListItemText
                                sx={{ mb: 1 }}
                                // primary={classData?.name}
                                secondary={` مهلت انجام تمرین: ${report?.end_date?.replaceAll('-', '/')}`}
                                primaryTypographyProps={{
                                    typography: 'subtitle1',
                                }}
                                secondaryTypographyProps={{
                                    mt: 1,
                                    component: 'span',
                                    typography: 'caption',
                                    color: 'text.disabled',
                                }}
                            />
                        </Box>
                    </Stack>
                    <Box>
                        <ListItemText
                            sx={{ my: 1 }}
                            primary={'درس ها'}
                            secondary={report?.categories?.join(', ')}
                            primaryTypographyProps={{
                                typography: 'subtitle1',
                            }}
                            secondaryTypographyProps={{
                                mt: 1,
                                component: 'span',
                                typography: 'caption',
                                color: 'text.disabled',
                            }}
                        />
                    </Box>
                </Stack>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Grid container spacing={5} sx={{ p: 3 }} justifyContent={'center'}>
                    <Grid item xs={12} md={6}>
                        <BookingWidgetSummary
                            title="سوالات پاسخ داده شده"
                            total={report?.questions_answered}
                            icon={
                                <Iconify
                                    width={50}
                                    icon="ic:twotone-done"
                                    style={{ color: alpha(theme.palette.primary.dark, 1) }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <BookingWidgetSummary
                            title="پاسخ های درست"
                            total={report?.correct_answers}
                            icon={
                                <Iconify
                                    width={50}
                                    icon="material-symbols:done-all"
                                    style={{ color: alpha(theme.palette.primary.dark, 1) }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <BookingWidgetSummary
                            title="زمان صرف شده"
                            total={report?.elapsed_time}
                            icon={
                                <Iconify
                                    width={50}
                                    icon="uiw:time"
                                    style={{ color: alpha(theme.palette.primary.dark, 1) }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <BookingWidgetSummary
                            title="میانگین امتیاز"
                            total={report?.avg_score}
                            icon={
                                <Iconify
                                    width={50}
                                    icon="ri:medal-fill"
                                    style={{ color: alpha(theme.palette.primary.dark, 1) }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </Card>
            {/* <Typography
                variant="h4"
                sx={{
                    mt: 2,
                    mb: 6,
                }}
            >
                تکلیف &nbsp; ۱
            </Typography> */}
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
                <Grid container spacing={{ xs: 4, md: 3 }}>
                    <Grid item xs={12} md={8}>
                        <>
                            <Card>
                                <Box sx={{ p: 2, px: 4, display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="button">مهارت ها</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="caption">امتیاز</Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ borderStyle: 'dashed' }} />
                                <CardContent sx={{ pt: 0 }}>
                                    {skills.map((skill, index) => (
                                        <Stack
                                            onClick={() =>
                                                router.push(paths.student.homeWorkQuestion(skill.key, homeworkId))
                                            }
                                            direction="row"
                                            alignItems="center"
                                            key={index}
                                            my={2}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <ListItemText
                                                primary={`${toFarsiNumber(index + 1)}. ${skill.name}`}
                                                primaryTypographyProps={{
                                                    noWrap: true,
                                                    typography: 'subtitle2',
                                                }}
                                            />
                                            <Tooltip title={'امتیاز'} placement="top">
                                                <Label color={'success'} sx={{ width: 64 }}>
                                                    {toFarsiNumber(skill.score || 0)}
                                                </Label>
                                            </Tooltip>
                                        </Stack>
                                    ))}
                                </CardContent>
                            </Card>
                        </>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Stack spacing={4}>
                            <TeachersMessage message={report?.comment} img={<SeoIllustration />} />
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}
