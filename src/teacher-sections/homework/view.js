import { forwardRef } from 'react';
import { useNavigate } from 'react-router';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
// components
import { useSettingsContext } from 'src/components/settings';
import Students from './homework-students';

import HomeworkSkills from './homework-skills';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { Box, alpha } from '@mui/material';
import CommingSoon from '../components/coming-soon';

//utils
import { fGrade } from 'src/utils/format-number';

//axios
import axios, { endpoints } from 'src/utils/axios';
import { useLocation, useParams } from 'react-router';
import { Card } from '@mui/material';
import ModifyHomework from '../class/class-new-homework/view';

// custom components
import FormProvider from 'src/components/hook-form';
import useInnerWidth from 'src/hooks/use-inner-width';
// import RevivalHomework from './homework-revival-content';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const getEnglishDigits = (numberString) => {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    let res = numberString;
    for (let i = 0; i < 10; i++) {
        res = res.replace(persianNumbers[i], i);
    }
    return res;
};

const fixDateLength = (dateString) => {
    const parts = dateString.split('-');
    return `${parts[0]}-${parts[1].length === 1 ? '0' + parts[1] : parts[1]}-${
        parts[2].length === 1 ? '0' + parts[2] : parts[2]
    }`;
};

// ----------------------------------------------------------------------

const TABS = [
    {
        value: 'skills',
        label: 'مهارت ها',
        icon: <Iconify icon="solar:notebook-line-duotone" width={24} />,
    },
    {
        value: 'students',
        label: 'دانش‌آموزان',
        icon: <Iconify icon="solar:user-id-line-duotone" width={24} />,
    },
];

// ----------------------------------------------------------------------

export const getGradeNumber = (grade) => {
    switch (grade) {
        case 'چهارم':
            return 4;
        case 'پنجم':
            return 5;
        case 'ششم':
            return 6;
        default:
            return null
    }
};

export default function Homework() {
    const cache = {};
    const innerWidth = useInnerWidth();
    const settings = useSettingsContext();
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('skills');
    const { enqueueSnackbar } = useSnackbar();
    const [classData, setClassData] = useState();
    const [skills, setSkills] = useState([]);
    const [unExtendEnd, setUnExtendEnd] = useState();

    const params = useParams();
    const { id } = params;
    useEffect(() => {
        Promise.all([axios.get(endpoints.teacher.get_class_by_homework(id))])
            .then((response) => {
                const class_data = response[0].data;
                setClassData(class_data);
                setUnExtendEnd(class_data.end_date);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', { variant: 'error' });
            });
    }, []);

    const getClassData = () => {
        axios.get(endpoints.teacher.get_class_by_homework(id))
        .then((response) => {
            const class_data = response.data;
            setClassData(class_data);
            setUnExtendEnd(class_data.end_date);
        })
        .catch((error) => {
            enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', { variant: 'error' });
        });
    }

    const handleChangeTab = useCallback((event, newValue) => {
        setCurrentTab(newValue);
    }, []);

    const [editOpen, setEditOpen] = useState(false);

    const {
        state: { classId, grade },
    } = useLocation();

    const [deleteOpen, setDeleteOpen] = useState(false);

    const deleteHomework = () => {
        axios
            .delete(endpoints.teacher.delete_homework(id))
            .then((response) => {
                if (response.data.message === 'Done') {
                    enqueueSnackbar('تکلیف با موفقیت حذف شد.', { variant: 'success' });
                    setTimeout(() => navigate(-1), 1500);
                }
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در ارسال اطلاعات', { variant: 'error' });
            });
    };

    const [extendOpen, setExtendOpen] = useState(false);
    const [extendEndDate, setExtendEndDate] = useState(new Date());
    const extendHomework = () => {
        axios
            .patch(
                endpoints.teacher.patch_homework_deadline(
                    id,
                    fixDateLength(
                        getEnglishDigits(new Date(extendEndDate).toLocaleDateString('fa-IR').replaceAll('/', '-'))
                    )
                )
            )
            .then((response) => {
                if (response.data.message === 'Done') {
                    enqueueSnackbar('مهلت تکلیف با موفقیت تمدید شد', { variant: 'success' });
                    axios
                        .get(endpoints.teacher.get_class_by_homework(id))
                        .then((response) => {
                            setClassData(response.data);
                            setUnExtendEnd(response.data.end_date);
                        })
                        .catch((error) => {
                            enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                                variant: 'error',
                            });
                        });
                }
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در ارسال اطلاعات', { variant: 'error' });
            });
    };

    return (
        <>
            <Container maxWidth={settings.themeStretch ? false : 'xl'}>
                <Card sx={{ cursor: 'pointer' }}>
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
                                alt={classData?.name}
                                src={'/assets/images/book/book_1.jpg'}
                                variant="rounded"
                                sx={{ width: 64, height: 64, mb: 2 }}
                            /> */}

                            <img
                                src={classData?.icon}
                                alt="homework"
                                width="64"
                                height="64"
                                style={{ marginBottom: 2 }}
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
                                    <Iconify
                                        width={16}
                                        icon="noto:woman-teacher-light-skin-tone"
                                        sx={{ flexShrink: 0 }}
                                    />
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
                </Card>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: innerWidth < 768 ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <CardHeader title={'تکالیف'} sx={{ px: 1, mb: 3 }} />

                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            size="small"
                            color="secondary"
                            endIcon={<Iconify icon="ic:outline-more-time" width={18} />}
                            variant="contained"
                            onClick={() => setExtendOpen(true)}
                            sx={{ ml: 'auto', mr: 2, mb: 1 }}
                        >
                            تمدید مهلت
                        </Button>

                        <Button
                            size="small"
                            color="primary"
                            endIcon={<Iconify icon="material-symbols:edit" width={18} />}
                            variant="contained"
                            onClick={() => setEditOpen(true)}
                            sx={{ mr: 2, mb: 1 }}
                            disabled={classData?.started}
                        >
                            ویرایش تکلیف
                        </Button>

                        <Button
                            size="small"
                            color="error"
                            endIcon={<Iconify icon="material-symbols:delete" width={18} />}
                            variant="contained"
                            onClick={() => setDeleteOpen(true)}
                            sx={{ mr: 0.5, mb: 1 }}
                            disabled={classData?.started}
                        >
                            حذف تکلیف
                        </Button>
                    </Box>
                </Box>

                {/* extend homework dialog */}
                <Dialog
                    open={extendOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setExtendOpen(false)}
                    fullWidth
                >
                    <DialogTitle sx={{ fontFamily: 'Mikhak-VF' }}>تمدید تکلیف</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 2 }}>
                            {/* <DatePicker
                                label="مهلت قبلی"
                                readOnly
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name="extendEndDate"
                                        variant="outlined"
                                        type="int"
                                        value={
                                            new Date(unExtendEnd).toJSON()
                                                ? new Date(unExtendEnd).toJSON()?.slice(0, 10).split('-').join('/')
                                                : '0'
                                        }
                                        inputProps={{
                                            style: {
                                                fontFamily: 'PersianNumber',
                                            },
                                        }}
                                    />
                                )}
                            /> */}
                            <Typography>
                                {'مهلت قبلی: ' + new Date(unExtendEnd).toJSON()?.slice(0, 10).split('-').join('/')}
                            </Typography>
                            <DatePicker
                                label="تاریخ پایان جدید"
                                value={extendEndDate}
                                onChange={(newValue) => setExtendEndDate(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        name="extendEndDate"
                                        variant="outlined"
                                        type="int"
                                        value={new Date(extendEndDate).toLocaleDateString('fa-IR')}
                                        inputProps={{
                                            style: {
                                                fontFamily: 'PersianNumber',
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setExtendOpen(false)} variant="outlined" color="primary" sx={{ mr: 2 }}>
                            بستن
                        </Button>
                        <Button
                            onClick={() => {
                                extendHomework();
                                setExtendOpen(false);
                            }}
                            variant="contained"
                            color="primary"
                        >
                            تایید
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* delete homework dialog */}
                <Dialog
                    open={deleteOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setDeleteOpen(false)}
                    fullWidth
                >
                    <DialogTitle sx={{ fontFamily: 'Mikhak-VF' }}>حذف تکلیف</DialogTitle>
                    <DialogContent>آیا از حذف این تکلیف اطمینان دارید؟</DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteOpen(false)} variant="outlined" color="primary" sx={{ mr: 2 }}>
                            بستن
                        </Button>
                        <Button
                            onClick={() => {
                                deleteHomework();
                                setDeleteOpen(false);
                            }}
                            variant="contained"
                            color="primary"
                        >
                            تایید
                        </Button>
                    </DialogActions>
                </Dialog>

                <ModifyHomework
                    classId={classId}
                    homeworkId={id}
                    open={editOpen}
                    setOpen={setEditOpen}
                    isEdit
                    grade={getGradeNumber(grade)}
                    setBriefHomeworkData={setClassData}
                    setHomeworkSkills={setSkills}
                    setUnExtendEndDate={setUnExtendEnd}
                    cache={cache}
                />
                {/* <RevivalHomework homeworkId={id} open={revivalOpen} setOpen={setRevivalOpen} startDate={new Date()} /> */}

                <Tabs
                    value={currentTab}
                    onChange={handleChangeTab}
                    sx={{
                        mb: { xs: 3, md: 5 },
                    }}
                >
                    {TABS.map((tab) => (
                        <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                    ))}
                </Tabs>

                {currentTab === 'students' && <Students getClassData={getClassData} cache={cache} homeworkId={id} />}

                {currentTab === 'skills' && <HomeworkSkills cache={cache} skills={skills} setSkills={setSkills} />}
            </Container>
        </>
    );
}
