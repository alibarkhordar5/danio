import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//
import { HeaderSimple as Header } from '../_common';
//
import { bgGradientRadial } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function CompactLayout({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        ...bgGradientRadial({
          direction: 'ellipse at right bottom',
          startColor: alpha(theme.palette.primary.dark, 0.6),
          middleColor: alpha(theme.palette.primary.main, 0.16),
          endColor: alpha(theme.palette.primary.lighter, 0.6),
          imgUrl: '/assets/background/overlay_9.png',
        }),
      }}
    >
      <Header />

      <Container component="main">
        <Stack
          sx={{
            pt: 10,
            pb: 10,
            m: 'auto',
            maxWidth: 800,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </Box>
  );
}

CompactLayout.propTypes = {
  children: PropTypes.node,
};
