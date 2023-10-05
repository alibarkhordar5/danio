// @mui
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
// components
import ClassTimeStatistics from './class-time-statistics';
import ClassTimeline from './class-timeline';
import ClassSubjectStatistics from './class-subject-statistics';
import { ClassItem } from '../components/class';
import CommingSoon from '../components/coming-soon';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const TIME_LABELS = {
    week: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
    month: ['مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند', 'فروردین', 'اردیبهشت', 'خرداد'],
};

const LATEST_HW = [
    {
        id: 1,
        title: 'تکلیف سوم',
        description: 'مختصات و تقارن',
        type: 'homework',
        time: '1402/02/30',
    },
    {
        id: 2,
        title: 'امتحان اول',
        description: 'اعداد حقیقی',
        type: 'exam',
        time: '1402/02/30',
    },
    {
        id: 3,
        title: 'کوییز دوم',
        description: 'اعداد گنگ',
        type: 'quiz',
        time: '1402/02/30',
    },
    {
        id: 4,
        title: 'بازی ریاضی',
        description: '',
        type: 'fun',
        time: '1402/02/30',
    },
];

const class_item = {
    id: 1,
    name: 'شقایق ۱',
    grade: 5,
    school_name: 'فرزانگان',
    image: '/assets/images/book/book_1.jpg',
    last_update: '1402/02/21',
    student_num: 23,
    progress: 20,
};

// ----------------------------------------------------------------------

export default function ClassGeneral() {
    const theme = useTheme();

    // return (
    //     <Grid container spacing={3}>
    //         <Grid item xs={12} md={8.5}>
    //     <ClassTimeStatistics
    //       title="میانگین عملکرد دانش‌آموزان"
    //       chart={{
    //         colors: [
    //           theme.palette.success.main,
    //           theme.palette.warning.main,
    //           theme.palette.error.main,
    //           theme.palette.info.main,
    //         ],
    //         fills: ['solid', 'solid', 'solid', 'gradient'],
    //         labels: TIME_LABELS,
    //         series: [
    //           {
    //             type: 'هفتگی',
    //             data: [
    //               { name: 'مبتدی', fill: 'solid', type: 'column', data: [10, 41, 35, 15, 49, 62, 69] },
    //               { name: 'متوسط', fill: 'solid', type: 'column', data: [10, 34, 13, 56, 77, 88, 99] },
    //               { name: 'پیشرفته', fill: 'solid', type: 'column', data: [10, 43, 0, 12, 36, 64, 54] },
    //               { name: 'زمان', fill: 'gradient', type: 'area', data: [20, 40, 60, 32, 76, 36, 54] },
    //             ],
    //           },
    //           {
    //             type: 'ماهانه',
    //             data: [
    //               { name: 'مبتدی', fill: 'solid', type: 'column', data: [14, 91, 69, 62, 49, 51, 35, 41, 10] },
    //               { name: 'متوسط', fill: 'solid', type: 'column', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
    //               { name: 'پیشرفته', fill: 'solid', type: 'column', data: [22, 45, 34, 65, 32, 65, 34, 34, 15] },
    //               { name: 'زمان', fill: 'gradient', type: 'area', data: [22, 45, 34, 65, 32, 65, 34, 34, 15] },
    //             ],
    //           },
    //         ],
    //       }}
    //     />
    //   </Grid>

    //   <Grid item xs={12} md={3.5}>
    //     <ClassItem class_item={class_item} onOpen={() => alert('hi')} stackDirection="column" chartSize={160} />
    //   </Grid>

    //   <Grid item xs={12} md={8.5}>
    //     <ClassSubjectStatistics
    //       title="میانگین عملکرد دانش‌آموزان در مباحث"
    //       chart={{
    //         categories: [
    //           'عدد و الگوهای عددی',
    //           'کسر',
    //           'اعداد اعشاری',
    //           'تقارن و مختصات',
    //           'اندازه‌گیری',
    //           'تناسب و درصد',
    //           'تقریب',
    //         ],
    //         colors: [theme.palette.success.main, theme.palette.warning.main, theme.palette.info.main],
    //         series: [
    //           { name: 'مبتدی', data: [80, 50, 30, 40, 100, 20, 56] },
    //           { name: 'متوسط', data: [20, 30, 40, 80, 20, 80, 76] },
    //           { name: 'پیشرفته', data: [44, 76, 78, 13, 43, 10, 43] },
    //         ],
    //       }}
    //     />
    //   </Grid>

    //   <Grid item xs={12} md={3.5}>
    //     <ClassTimeline title="رویدادهای اخیر" list={LATEST_HW} />
    //   </Grid>

    //     </Grid>
    // );

    return (
        <Box sx={{ width: { xs: '90%', md: '60%' }, margin: '0 auto' }}>
            <CommingSoon />
        </Box>
    );
}
