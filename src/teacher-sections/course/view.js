import { m } from 'framer-motion';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// components
import { useSettingsContext } from 'src/components/settings';
import { MotionContainer, varSlide } from 'src/components/animate';
import CourseSection from './course-section';

// ----------------------------------------------------------------------

const items = [
  {
    title: 'عدد و الگو‌های عددی',
    icon: 'icon-park-outline:lattice-pattern',
    sections: [
      {
        title: 'الگوهای عددی',
        skills: [
          'دنباله‌های عددی',
          'تکمیل دنباله های عددی',
          'تشخیص جمله غلط دنباله',
          'الگویابی با کمک شکل',
          'مسائل کلامی',
        ],
      },
      {
        title: 'یادآوری عدد نویسی',
        skills: ['تشخیص جایگاه عدد', 'گسترده نویسی', 'مقایسه اعداد', 'ساختن عدد'],
      },
      {
        title: 'بخش‌پذیری',
        skills: ['بررسی بخش پذیری', 'پیدا کردن رقم مناسب'],
      },
      {
        title: 'اعداد صحیح',
        skills: ['مقایسه اعداد', 'مسائل ساعت و طبقه', 'الگویابی با محور', 'مسائل عقربه'],
      },
    ],
  },
  {
    title: 'کسر',
    icon: 'tabler:math-x-divide-y',
    sections: [
      {
        title: 'الگوهای عددی',
        skills: [
          'دنباله‌های عددی',
          'تکمیل دنباله های عددی',
          'تشخیص جمله غلط دنباله',
          'الگویابی با کمک شکل',
          'مسائل کلامی',
        ],
      },
      {
        title: 'یادآوری عدد نویسی',
        skills: ['تشخیص جایگاه عدد', 'گسترده نویسی', 'مقایسه اعداد', 'ساختن عدد'],
      },
      {
        title: 'بخش‌پذیری',
        skills: ['بررسی بخش پذیری', 'پیدا کردن رقم مناسب'],
      },
      {
        title: 'اعداد صحیح',
        skills: ['مقایسه اعداد', 'مسائل ساعت و طبقه', 'الگویابی با محور', 'مسائل عقربه'],
      },
    ],
  },
  {
    title: 'اعداد اعشاری',
    icon: 'eva:percent-fill',
    sections: [
      {
        title: 'الگوهای عددی',
        skills: [
          'دنباله‌های عددی',
          'تکمیل دنباله های عددی',
          'تشخیص جمله غلط دنباله',
          'الگویابی با کمک شکل',
          'مسائل کلامی',
        ],
      },
      {
        title: 'یادآوری عدد نویسی',
        skills: ['تشخیص جایگاه عدد', 'گسترده نویسی', 'مقایسه اعداد', 'ساختن عدد'],
      },
      {
        title: 'بخش‌پذیری',
        skills: ['بررسی بخش پذیری', 'پیدا کردن رقم مناسب'],
      },
      {
        title: 'اعداد صحیح',
        skills: ['مقایسه اعداد', 'مسائل ساعت و طبقه', 'الگویابی با محور', 'مسائل عقربه'],
      },
    ],
  },
  {
    title: 'تقارن و مختصات',
    icon: 'tabler:vector-off',
    sections: [
      {
        title: 'الگوهای عددی',
        skills: [
          'دنباله‌های عددی',
          'تکمیل دنباله های عددی',
          'تشخیص جمله غلط دنباله',
          'الگویابی با کمک شکل',
          'مسائل کلامی',
        ],
      },
      {
        title: 'یادآوری عدد نویسی',
        skills: ['تشخیص جایگاه عدد', 'گسترده نویسی', 'مقایسه اعداد', 'ساختن عدد'],
      },
      {
        title: 'بخش‌پذیری',
        skills: ['بررسی بخش پذیری', 'پیدا کردن رقم مناسب'],
      },
      {
        title: 'اعداد صحیح',
        skills: ['مقایسه اعداد', 'مسائل ساعت و طبقه', 'الگویابی با محور', 'مسائل عقربه'],
      },
    ],
  },
  {
    title: 'اندازه‌گیری',
    icon: 'entypo:ruler',
    sections: [
      {
        title: 'الگوهای عددی',
        skills: [
          'دنباله‌های عددی',
          'تکمیل دنباله های عددی',
          'تشخیص جمله غلط دنباله',
          'الگویابی با کمک شکل',
          'مسائل کلامی',
        ],
      },
      {
        title: 'یادآوری عدد نویسی',
        skills: ['تشخیص جایگاه عدد', 'گسترده نویسی', 'مقایسه اعداد', 'ساختن عدد'],
      },
      {
        title: 'بخش‌پذیری',
        skills: ['بررسی بخش پذیری', 'پیدا کردن رقم مناسب'],
      },
      {
        title: 'اعداد صحیح',
        skills: ['مقایسه اعداد', 'مسائل ساعت و طبقه', 'الگویابی با محور', 'مسائل عقربه'],
      },
    ],
  },
  {
    title: 'تناسب و درصد',
    icon: 'eva:percent-fill',
    sections: [
      {
        title: 'الگوهای عددی',
        skills: [
          'دنباله‌های عددی',
          'تکمیل دنباله های عددی',
          'تشخیص جمله غلط دنباله',
          'الگویابی با کمک شکل',
          'مسائل کلامی',
        ],
      },
      {
        title: 'یادآوری عدد نویسی',
        skills: ['تشخیص جایگاه عدد', 'گسترده نویسی', 'مقایسه اعداد', 'ساختن عدد'],
      },
      {
        title: 'بخش‌پذیری',
        skills: ['بررسی بخش پذیری', 'پیدا کردن رقم مناسب'],
      },
      {
        title: 'اعداد صحیح',
        skills: ['مقایسه اعداد', 'مسائل ساعت و طبقه', 'الگویابی با محور', 'مسائل عقربه'],
      },
    ],
  },
  {
    title: 'تقریب',
    icon: 'solar:palette-round-line-duotone',
    sections: [
      {
        title: 'الگوهای عددی',
        skills: [
          'دنباله‌های عددی',
          'تکمیل دنباله های عددی',
          'تشخیص جمله غلط دنباله',
          'الگویابی با کمک شکل',
          'مسائل کلامی',
        ],
      },
      {
        title: 'یادآوری عدد نویسی',
        skills: ['تشخیص جایگاه عدد', 'گسترده نویسی', 'مقایسه اعداد', 'ساختن عدد'],
      },
      {
        title: 'بخش‌پذیری',
        skills: ['بررسی بخش پذیری', 'پیدا کردن رقم مناسب'],
      },
      {
        title: 'اعداد صحیح',
        skills: ['مقایسه اعداد', 'مسائل ساعت و طبقه', 'الگویابی با محور', 'مسائل عقربه'],
      },
    ],
  },
];

// ----------------------------------------------------------------------

export default function CourseView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          mb: 4,
        }}
      >
        درس
      </Typography>

      <MotionContainer>
        {items.map((item, index) => (
          <Box
            key={index}
            component={m.div}
            variants={varSlide().inUp}
            sx={{
              my: 2,
              borderRadius: 1,
              objectFit: 'cover',
            }}
          >
            <CourseSection course={item} />
          </Box>
        ))}
      </MotionContainer>
    </Container>
  );
}
