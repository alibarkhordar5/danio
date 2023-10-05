// @mui
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// components
import { useSettingsContext } from 'src/components/settings';
import HomeworkPerformance from './homework-performance';
import HomeworkActivityChart from '../components/homework-ativity-chart';

// ----------------------------------------------------------------------

export default function PerformanceView() {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          mb: 4,
        }}
      >
        عملکرد من
      </Typography>

      <Stack spacing={3}>
        <HomeworkPerformance
          title="عملکرد در تکالیف"
          chart={{
            labels: ['تکلیف ۱', 'تکلیف ۲', 'تکلیف ۳', 'تکلیف ۴', 'تکلیف ۵', 'تکلیف ۶', 'تکلیف ۷', 'تکلیف ۸', 'تکلیف ۹'],
            colors: [theme.palette.success.main, theme.palette.info.main],
            series: [
              {
                name: 'امتیاز',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44],
              },
              {
                name: 'زمان',
                type: 'area',
                fill: 'gradient',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56],
              },
            ],
          }}
        />

        <HomeworkActivityChart
          title="فعالیت‌های من"
          chart={{
            labels: {
              week: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
              month: [
                'فروردین',
                'اردیبهشت',
                'خرداد',
                'تیر',
                'مرداد',
                'شهریور',
                'مهر',
                'آبان',
                'آذر',
                'دی',
                'بهمن',
                'اسفند',
              ],
            },
            colors: [theme.palette.success.main, theme.palette.error.main, theme.palette.warning.main],
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
      </Stack>
    </Container>
  );
}
