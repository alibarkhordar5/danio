import { useSettingsContext } from 'src/components/settings/context';
// @mui
import { Container, Typography } from '@mui/material';
// component
import OverviewWidgets from './widgets';

export default function GuideView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mt: { xs: 3, md: 6 },
          mb: { xs: 3, md: 4 },
        }}
      >
        راهنما
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: 'justify',
          textJustify: 'inter-word',
          mb: { xs: 3, md: 6 },
          lineHeight: 2.5,
        }}
      >
        تمرین‌های دانیو برای فرزندتان شخصی‌سازی شده‌اند و گزارش پیشرفت تحصیلی در اختیارتان قرار می‌گیرد. معلمان
        می‌توانند در تکلیف‌دهی دانش‌آموزان با سطوح مختلف، تفاوت‌های فردی را در نظر بگیرند و علاوه بر دریافت گزارش جامع و
        برخط در زمان‌شان صرفه‌جویی کنند. دانیو قابلیت پشتیبانی از فعالیت آموزشی مسجدمدرسه‌ها، کانون‌های تربیتی و آموزشی
        و مجموعه‌های فرهنگی را دارد. مدیران مدارس، معاونین آموزشی و مشاورین تحصیلی می‌توانند فرآیند تکلیف‌دهی مدرسه را
        به یک سامانه برخط منتقل کنند.
      </Typography>

      <OverviewWidgets />
    </Container>
  );
}
