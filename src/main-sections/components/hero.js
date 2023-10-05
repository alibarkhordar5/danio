import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
// components
import { MotionContainer, varFade } from 'src/components/animate';
//
import { bgGradientRadial } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function Hero({ title, subtitle, imageUrl }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: { md: 400 },
        pt: { xs: 20, md: 24 },
        pb: 6,
        ...bgGradientRadial({
          direction: 'ellipse at right top',
          startColor: alpha(theme.palette.primary.dark, 0.6),
          middleColor: alpha('#000', 0.7),
          endColor: alpha('#000', 0.9),
          imgUrl: imageUrl ? imageUrl : '/assets/background/class_6.png',
        }),
      }}
    >
      <Container component={MotionContainer}>
        <TextAnimate text={title} typography="h1" variants={varFade().inRight} sx={{ color: 'primary.light' }} />

        <br />

        <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'white' }}>
          {subtitle && subtitle.map((sub, index) => <TextAnimate text={sub} key={index} typography="h3" />)}
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, typography, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: typography,
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <m.span variants={variants || varFade().inUp}>{text}</m.span>
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
};
