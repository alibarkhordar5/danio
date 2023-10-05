// general imports
import { useState, useEffect } from 'react';
// @mui
import { Box, Container, Grid, Card, Tooltip, Stack, CardContent, ListItemText, Divider, Avatar } from '@mui/material';
// custom components
import { useParams } from 'src/routes/hook';
import { useSettingsContext } from 'src/components/settings';
import axios, { endpoints } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import Label from 'src/components/label/label';
import { paths } from 'src/routes/paths';
import { SeoIllustration } from 'src/assets/illustrations';
import { alpha, useTheme } from '@mui/material/styles';
//
import TeachersMessage from './student-homework-teachers-comment';
import { toFarsiNumber } from 'src/utils/format-number-persian';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify/iconify';
import { fGrade } from 'src/utils/format-number';
import BookingWidgetSummary from 'src/components/summeryWidget/booking-widget-summary';
import BookingIllustration from 'src/assets/illustrations/upload-illustration';

// -----------------------------------------------------------------------

const state = {
    NOT_STARTED: {
        name: 'شروع نکرده',
        color: 'error',
    },
    UNDONE: {
        name: 'ناقص',
        color: 'warning',
    },
    DONE: {
        name: 'انجام شده',
        color: 'success',
    },
    COMPLETED: {
        name: 'کامل شده',
        color: 'success',
    },
};

export default function StudentHomeworkView() {
    const theme = useTheme();
    const settings = useSettingsContext();
    const { enqueueSnackbar } = useSnackbar();
    const { homeworkId, studentId } = useParams();
    const [classData, setClassData] = useState();
    const [report, setReport] = useState();
    const [briefData, setBriefData] = useState({});
    const [skills, setSkills] = useState([]); // or maybe a list

    const updateBriefHomeworkReport = () => {
        axios
            .get(endpoints.teacher.get_brief_homework_report(homeworkId, studentId))
            .then((response) => {
                setBriefData(response.data);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
    };

    useEffect(() => {
        updateBriefHomeworkReport();
        axios
            .get(endpoints.teacher.get_student_homework_skills(homeworkId, studentId))
            .then((response) => {
                setSkills(response.data);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
        Promise.all([
            axios.get(endpoints.teacher.get_class_by_homework(homeworkId)),
            axios.get(endpoints.teacher.get_homework_brief(homeworkId, studentId)),
        ])
            .then((response) => {
                const class_data = response[0].data;
                setClassData(class_data);
                const studentReport = response[1].data;
                setReport(studentReport);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', { variant: 'error' });
            });
    }, []);

    // const classData = {};

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            {/* <p>{JSON.stringify(briefData)}</p>
            <p>{JSON.stringify(skills)}</p> */}
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
                        <Avatar
                            alt={classData?.name}
                            src={'/assets/images/book/book_1.jpg'}
                            variant="rounded"
                            sx={{ width: 64, height: 64, mb: 2 }}
                        />
                        <Box>
                            <ListItemText
                                sx={{ mb: 1 }}
                                primary={classData?.name}
                                secondary={` تاریخ شروع تمرین: ${classData?.start_date?.replaceAll('-', '/')}`}
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
                                secondary={` مهلت انجام تمرین: ${classData?.end_date?.replaceAll('-', '/')}`}
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
                        <Stack
                            spacing={0.5}
                            direction="row"
                            alignItems="center"
                            sx={{ color: 'primary.dark', typography: 'caption' }}
                        >
                            {/* {toFarsiNumber(student_num)}  */}
                            <Iconify width={16} icon="carbon:chart-average" />
                            میانگین امتیاز: {classData?.avg_score || 0}
                        </Stack>
                        <ListItemText
                            sx={{ my: 1 }}
                            primary={'درس ها'}
                            secondary={classData?.categories?.join(', ')}
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

                <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
                    {[
                        {
                            label: classData?.class?.name,
                            icon: (
                                <Iconify width={16} icon="noto:woman-teacher-light-skin-tone" sx={{ flexShrink: 0 }} />
                            ),
                        },
                        {
                            label: `پایه‌ی ${fGrade(classData?.class?.grade)}`,
                            icon: <Iconify width={16} icon="noto:school-backpack" sx={{ flexShrink: 0 }} />,
                        },
                    ].map((item) => (
                        <Stack
                            key={item.label}
                            spacing={0.5}
                            flexShrink={0}
                            direction="row"
                            alignItems="center"
                            sx={{ color: 'text.disabled', minWidth: 0 }}
                        >
                            {item.icon}
                            <Typography variant="caption" noWrap>
                                {item.label}
                            </Typography>
                        </Stack>
                    ))}
                </Box>
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
            <Grid container spacing={{ xs: 4, md: 3 }}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <Box sx={{ p: 2, px: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="button">مهارت ها</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="caption">امتیاز</Typography>
                                <Box
                                    sx={{
                                        width: '2px',
                                        height: '20px',
                                        backgroundColor: 'gray',
                                        margin: '0px 25px',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Typography variant="caption">وضعیت</Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        <CardContent sx={{ pt: 0 }}>
                            {skills.map((skill, index) => (
                                <Stack direction="row" alignItems="center" spacing={2} key={index} my={2}>
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

                                    <Tooltip title={'وضعیت'} placement="top">
                                        <Label color={state[skill.state].color} sx={{ width: 64 }}>
                                            {state[skill.state].name}
                                        </Label>
                                    </Tooltip>
                                </Stack>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={4}>
                        <TeachersMessage
                            isStudnet={true}
                            message={briefData.comment || ''}
                            img={<SeoIllustration />}
                            update={updateBriefHomeworkReport}
                            homeworkId={homeworkId}
                            studentId={studentId}
                        />
                        {/* <HomeworkAnalytics /> */}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}
