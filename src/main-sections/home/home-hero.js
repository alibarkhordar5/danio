import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { paths } from 'src/routes/paths';
// theme
import { bgGradientRadial } from 'src/theme/css';
// layouts
import { HEADER } from 'src/layouts/config-layout';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade, varSlide, varZoom } from 'src/components/animate';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const MIN_HEIGHT = 680;
const MAX_HEIGHT = 1200;

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradientRadial({
    direction: 'ellipse at right top',
    startColor: alpha(theme.palette.primary.darker, 0.86),
    middleColor: alpha(theme.palette.primary.main, 0.6),
    endColor: alpha(theme.palette.primary.lighter, 0.6),
    imgUrl: '/assets/background/overlay_9.png',
  }),
  width: '100%',
  height: '100vh',
  minHeight: MIN_HEIGHT,
  maxHeight: MAX_HEIGHT,
  top: 0,
  left: 0,
  position: 'fixed',
}));

const StyledWrapper = styled('div')(() => ({
  height: '100vh',
  minHeight: MIN_HEIGHT,
  maxHeight: MAX_HEIGHT,
  overflow: 'hidden',
  position: 'relative',
  paddingTop: HEADER.H_DESKTOP_OFFSET + 96,
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const isPortrait = w < h;

  const heroRef = useRef(null);

  const smUp = useResponsive('up', 'sm');

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const transition = {
    ease: 'linear',
    duration: 1.5,
  };

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Stack
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        opacity: opacity > 0 ? opacity : 0,
        px: 2,
      }}
    >
      <m.div variants={varZoom().inRight}>
        <Typography variant="h1" my={1}>
          دانیو
        </Typography>
      </m.div>

      <m.div variants={varZoom().inRight}>
        <Typography variant="h4" mt={1}>
          سکوی هوشمند دانایی
        </Typography>
      </m.div>

      <m.div variants={varZoom().inRight}>
        <Typography variant="h4" mb={1}>
          گامی به سوی عدالت آموزشی
        </Typography>
      </m.div>

      {smUp && (
        <m.div variants={varZoom().inRight}>
          <Typography variant="body1" my={2}>
            با استفاده از امکانات وبگاه می‌توانید تمرین‌های دروس ریاضی خود را به صورت برخط بخوانید.
          </Typography>
        </m.div>
      )}

      <m.div variants={varZoom().inRight}>
        <Stack spacing={1.5} direction={{ xs: 'column', sm: 'row' }} sx={{ my: 3 }}>
          <Button
            component={RouterLink}
            href={paths.student.root}
            color="inherit"
            size={smUp ? 'large' : 'medium'}
            variant="contained"
            startIcon={<Iconify icon="solar:laptop-line-duotone" width={24} />}
          >
            نسخه‌ی آزمایشی
          </Button>

          <Button
            component={RouterLink}
            href={paths.auth.jwt.register}
            color="inherit"
            size={smUp ? 'large' : 'medium'}
            variant="outlined"
            startIcon={<Iconify icon="eva:external-link-fill" width={24} />}
            sx={{ borderColor: 'text.primary' }}
          >
            ثبت‌نام
          </Button>
        </Stack>
      </m.div>
    </Stack>
  );

  const renderImages = (
    <Box
      component={m.img}
      variants={varSlide().inLeft}
      // animate={{ y: ['-100%', '0%'] }}
      // transition={transition}
      src={`/assets/images/home/hero/school_4.png`}
      sx={{
        position: 'relative',
        opacity: opacity > 0 ? opacity : 0,
        px: { xs: 4, md: 0 },
        maxWidth: '100%',
      }}
    />
  );

  const renderClouds = (
    <Box
      component={m.img}
      src={`/assets/images/home/hero/clouds.png`}
      sx={{
        position: 'absolute',
        bottom: -4,
        right: 0,
        left: 0,
        width: 1,
        maxHeight: '16vh',
      }}
    />
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper
          sx={{
            mt: `-${HEADER.H_DESKTOP}px`,
          }}
        >
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={2} sx={{ height: 1, alignItems: 'center' }}>
              <Grid xs={12} sm={isPortrait ? 12 : 6} lg={6}>
                {renderDescription}
              </Grid>
              <Grid xs={12} sm={isPortrait ? 12 : 6} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                {renderImages}
              </Grid>
            </Grid>
          </Container>
        </StyledWrapper>
      </StyledRoot>

      <Box sx={{ height: '100vh', minHeight: MIN_HEIGHT, maxHeight: MAX_HEIGHT, position: 'relative' }}>
        {renderClouds}
      </Box>
    </>
  );
}
