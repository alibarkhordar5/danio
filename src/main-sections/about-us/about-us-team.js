import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// _mock
import { _carouselsMembers, _socials } from 'src/_mock';
// components
import Image from 'src/components/image';
import { MotionViewport, varFade } from 'src/components/animate';
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------

const Members = [
  {
    id: 1,
    firstName: 'تست',
    lastName: 'تست',
    role: 'توسعه دهنده تست',
    avatarUrl: '/assets/images/about/profile.png',
  },
  {
    id: 2,
    firstName: 'تست',
    lastName: 'تست',
    role: 'توسعه دهنده تست',
    avatarUrl: '/assets/images/about/profile.png',
  },
  {
    id: 3,
    firstName: 'تست',
    lastName: 'تست',
    role: 'توسعه دهنده تست',
    avatarUrl: '/assets/images/about/profile.png',
  },
  {
    id: 4,
    firstName: 'تست',
    lastName: 'تست',
    role: 'توسعه دهنده تست',
    avatarUrl: '/assets/images/about/profile.png',
  },
  {
    id: 5,
    firstName: 'تست',
    lastName: 'تست',
    role: 'توسعه دهنده تست',
    avatarUrl: '/assets/images/about/profile.png',
  },
  {
    id: 6,
    firstName: 'تست',
    lastName: 'تست',
    role: 'توسعه دهنده تست',
    avatarUrl: '/assets/images/about/profile.png',
  },
];

// ----------------------------------------------------------------------

export default function AboutUsTeam() {
  const carousel = useCarousel({
    infinite: true,
    slidesToShow: 4,
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
    <Container component={MotionViewport} sx={{ textAlign: 'center', pt: { xs: 10, md: 15 } }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          تیم ما
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          توضیح تست تست تست تست تست تست تست
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows
          filled
          shape="rounded"
          onNext={carousel.onNext}
          onPrev={carousel.onPrev}
          leftButtonProps={{
            sx: {
              left: 24,
              ...(Members.length < 5 && { display: 'none' }),
            },
          }}
          rightButtonProps={{
            sx: {
              right: 24,
              ...(Members.length < 5 && { display: 'none' }),
            },
          }}
        >
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {Members.map((member) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade().in}
                sx={{
                  px: 1.5,
                  py: { xs: 8, md: 10 },
                }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function MemberCard({ member }) {
  const { firstName, lastName, role, avatarUrl } = member;
  return (
    <Card key={lastName}>
      <Typography variant="subtitle1" sx={{ mt: 2.5, mb: 0.5 }}>
        {firstName} {lastName}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {role}
      </Typography>

      <Box sx={{ p: 1 }}>
        <Image alt={lastName} src={avatarUrl} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>
    </Card>
  );
}

MemberCard.propTypes = {
  member: PropTypes.object,
};
