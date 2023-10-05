import { m } from 'framer-motion';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// components
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';
import { MotionViewport, varZoom } from 'src/components/animate';
import { CardContent } from '@mui/material';

// -------------------------------------------------------------------------------------------
const REVIEWS = [
  {
    id: 1,
    name: 'تست تست',
    profile_url: '/assets/images/about/profile.png',
    school_name: 'مدرسه تست',
    comment:
      'ما با استفاده از دانیو تونستیم درس خوندن رو برای بچه هامون جذاب کنیم. همچنین تونستیم نقاط قوت و ضعف دانش‌آموزان رو شناسایی کنیم.',
  },
  {
    id: 2,
    name: 'تست تست',
    profile_url: '/assets/images/about/profile.png',
    school_name: 'مدرسه تست',
    comment:
      'ما با استفاده از دانیو تونستیم درس خوندن رو برای بچه هامون جذاب کنیم. همچنین تونستیم نقاط قوت و ضعف دانش‌آموزان رو شناسایی کنیم.',
  },
  {
    id: 3,
    name: 'تست تست',
    profile_url: '/assets/images/about/profile.png',
    school_name: 'مدرسه تست',
    comment:
      'ما با استفاده از دانیو تونستیم درس خوندن رو برای بچه هامون جذاب کنیم. همچنین تونستیم نقاط قوت و ضعف دانش‌آموزان رو شناسایی کنیم.',
  },
  {
    id: 4,
    name: 'تست تست',
    profile_url: '/assets/images/about/profile.png',
    school_name: 'مدرسه تست',
    comment:
      'ما با استفاده از دانیو تونستیم درس خوندن رو برای بچه هامون جذاب کنیم. همچنین تونستیم نقاط قوت و ضعف دانش‌آموزان رو شناسایی کنیم.',
  },
  {
    id: 5,
    name: 'تست تست',
    profile_url: '/assets/images/about/profile.png',
    school_name: 'مدرسه تست',
    comment:
      'ما با استفاده از دانیو تونستیم درس خوندن رو برای بچه هامون جذاب کنیم. همچنین تونستیم نقاط قوت و ضعف دانش‌آموزان رو شناسایی کنیم.',
  },
];

// -------------------------------------------------------------------------------------------

function Review({ data }) {
  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" justifyContent="center" spacing={1}>
          <Avatar
            src={data.profile_url}
            alt={data.name}
            sx={{
              width: 100,
              height: 100,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          />
          <Typography variant="subtitle2">{data.name}</Typography>
          <Typography variant="caption" color="text.disabled">
            {data.school_name}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
          {data.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

// -------------------------------------------------------------------------------------------

export default function HomeTeacherReview() {
  const theme = useTheme();
  const carousel = useCarousel({
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  return (
    <Box
      sx={{
        py: 5,
        position: 'relative',
        bgcolor: alpha(theme.palette.background.default, 0.4),
      }}
    >
      <Container component={MotionViewport}>
        <Typography variant="h3" textAlign="center" sx={{ mb: { xs: 0, md: 2 } }}>
          نظرات معلمان و مدیران
        </Typography>
        <Box sx={{ position: 'relative' }}>
          <CarouselArrows
            filled
            shape="rounded"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
            leftButtonProps={{
              sx: {
                left: 24,
                ...(REVIEWS.length < 5 && { display: 'none' }),
              },
            }}
            rightButtonProps={{
              sx: {
                right: 24,
                ...(REVIEWS.length < 5 && { display: 'none' }),
              },
            }}
          >
            <Carousel
              ref={carousel.carouselRef}
              {...carousel.carouselSettings}
              sx={{
                '&.slick-slide': { mx: 2 },
              }}
            >
              {REVIEWS.map((data, index) => (
                <Box
                  key={data.id}
                  component={m.div}
                  variants={varZoom().in}
                  sx={{
                    px: 1.5,
                    py: { xs: 8, md: 10 },
                  }}
                >
                  <Review data={data} />
                </Box>
              ))}
            </Carousel>
          </CarouselArrows>
        </Box>
      </Container>
    </Box>
  );
}
