// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// data
import { _socials } from 'src/assets/data/socials';
// components
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { Tooltip } from '@mui/material';
// hook
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradientRadial } from 'src/theme/css';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function Footer() {
  const theme = useTheme();

  const smDown = useResponsive('down', 'sm');

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        position: 'relative',
        background: `radial-gradient(ellipse at right bottom, 
          ${alpha(theme.palette.primary.main, 0.4)} 0%, ${alpha(theme.palette.primary.light, 0.4)} 40%, ${alpha(
          theme.palette.primary.lighter,
          0.4
        )} 100%)`,
      }}
    >
      <Box
        component="img"
        src={`/assets/images/home/hero/clouds.png`}
        sx={{
          position: 'absolute',
          top: -4,
          right: 0,
          left: 0,
          width: 1,
          maxHeight: '16vh',
          transform: 'rotate(180deg)',
        }}
      />
      <Container
        sx={{
          pt: 10,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Logo sx={{ mb: 2, width: 120, height: 120 }} />

        <Stack
          direction={smDown ? 'column-reverse' : 'row'}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          sx={{ pb: 2 }}
        >
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" display="flex" alignItems="center">
              <Iconify icon="solar:phone-calling-rounded-bold" mr={1} color="primary.dark" />
              ۰۲۱-۶۶۱۶۳۶۱۸
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Iconify icon="ic:round-location-on" mr={1} color="primary.dark" />
              تهران، خیابان آزادی، کوچه صادقی، پلاک ۱۹
            </Typography>
          </Stack>

          <Box component="img" src="assets/images/enamad/danio_enamad.png" sx={{ width: 80 }} />
        </Stack>

        <Stack
          direction={smDown ? 'column-reverse' : 'row'}
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          pt={{ xs: 2, md: 1 }}
        >
          <Typography variant="caption">© تمامی حقوق مادی و معنوی این وب‌سایت متعلق به دانیو می‌باشد.</Typography>
          <Stack direction="row">
            {_socials.map((social, index) => (
              <Tooltip title={social.name} key={index}>
                <IconButton
                  key={social.name}
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.dark, 0.08),
                    },
                  }}
                  component={RouterLink}
                  href={social.path}
                  target="_blank"
                >
                  {social.icon}
                  {/* <Iconify color={social.color} icon={social.icon} /> */}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
