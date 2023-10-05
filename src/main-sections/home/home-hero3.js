import { m, useScroll } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// layouts
import { HEADER } from 'src/layouts/config-layout';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varFade } from 'src/components/animate';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const MIN_HEIGHT = 680;
const MAX_HEIGHT = 1200;

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundImage: `url(/assets/background/class_5.png)`,
  backgroundSize: 'cover',
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

export default function HomeHero3() {
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
      <m.div variants={varFade().in}>
        <Typography variant="h1" my={1}>
          دانیو، تکلیف شخصی سازی شده
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="h4" mb={1}>
          وقتشه هر کسی تمرین های مخصوص به خودش رو داشته باشه!
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Button
          component={RouterLink}
          href={paths.auth.jwt.register}
          color="inherit"
          size={smUp ? 'large' : 'medium'}
          variant="contained"
          startIcon={<Iconify icon="solar:laptop-line-duotone" width={24} />}
          sx={{ mt: 3 }}
        >
          ثبت نام رایگان
        </Button>
      </m.div>
      <m.div variants={varFade().in}>
        <Button
          color="inherit"
          size={smUp ? 'large' : 'medium'}
          variant="outlined"
          startIcon={<Iconify icon="ph:seal-check-duotone" width={24} />}
          sx={{ borderColor: 'text.primary', mt: 3 }}
        >
          مورد تایید سازمان آموزش و پرورش
        </Button>
      </m.div>
    </Stack>
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
            mt: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
          }}
        >
          <Container component={MotionContainer} sx={{ height: 1, alignItems: 'center' }}>
            {renderDescription}
          </Container>
        </StyledWrapper>
      </StyledRoot>

      <Box sx={{ height: '100vh', minHeight: MIN_HEIGHT, maxHeight: MAX_HEIGHT, position: 'relative' }}>
        {renderClouds}
      </Box>
    </>
  );
}
