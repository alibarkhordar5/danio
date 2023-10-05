// mui
import { Container, Box, Typography, Stack } from '@mui/material';
// components
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------

const BRANDS = [
  {
    id: 1,
    name: 'بنیاد رفاه',
    imageUrl: '/assets/images/logo/refah.png',
  },
  {
    id: 2,
    name: 'فرزانگان ۱ تهران',
    imageUrl: '/assets/images/logo/farzanegan.png',
  },
  {
    id: 3,
    name: 'علامه حلی ۳ تهران',
    imageUrl: '/assets/images/logo/helli.png',
  },
  {
    id: 4,
    name: 'منظومه خرد',
    imageUrl: '/assets/images/logo/kherad.png',
  },
  {
    id: 5,
    name: 'علامه طباطبایی آبشناسان',
    imageUrl: '/assets/images/logo/allameh.png',
  },
  {
    id: 6,
    name: 'مجمتمع فرهنگی روشنگر',
    imageUrl: '/assets/images/logo/roshangar.png',
  },
  {
    id: 7,
    name: 'مجموعه سرمد',
    imageUrl: '/assets/images/logo/sarmad.png',
  },
];

// ----------------------------------------------------------------------

export default function HomeTrustedCompany() {
  const carousel = useCarousel({
    infinite: true,
    slidesToShow: 5,
    autoplay: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1000,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  return (
    <Container sx={{ pb: { xs: 10, md: 15 } }}>
      <Typography variant="h3" textAlign="center">
        مدارسی که به ما اعتماد کرده‌اند
      </Typography>

      <Box sx={{ position: 'relative', mt: 8 }}>
        <CarouselArrows
          filled
          shape="rounded"
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{
            sx: {
              left: 24,
              ...(BRANDS.length < 5 && { display: 'none' }),
            },
          }}
          rightButtonProps={{
            sx: {
              right: 24,
              ...(BRANDS.length < 5 && { display: 'none' }),
            },
          }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {BRANDS.map((brand, index) => (
              <TrustedCompanyItem data={brand} key={index} />
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </Container>
  );
}
// ----------------------------------------------------------------------

export function TrustedCompanyItem({ data }) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      flexGrow={1}
      sx={{
        py: 2,
        color: 'text.disabled',
        filter: 'grayscale(100%)',
        '&:hover': {
          color: 'inherit',
          filter: 'none',
          '& p': { typography: 'subtitle2', mt: -1 },
          transform: 'scale3d(1.2, 1.2, 1)',
          px: 3,
        },
      }}
    >
      <Box
        component="img"
        src={data?.imageUrl}
        sx={{
          maxWidth: 120,
          height: 60,
        }}
      />
      <Typography py={2}>{data?.name}</Typography>
    </Stack>
  );
}
