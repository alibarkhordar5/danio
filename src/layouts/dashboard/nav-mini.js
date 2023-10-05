// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// theme
import { alpha, useTheme } from '@mui/material/styles';
import { hideScroll } from 'src/theme/css';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import Logo from 'src/components/logo';
import { NavSectionMini } from 'src/components/nav-section';
import NavAccount from 'src/components/nav-section/mini/nav-account';
//
import { NAV } from '../config-layout';
import useNavData from './config-navigation';
import { NavToggleButton } from '../_common';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useAuthContext();

  const navData = useNavData();

  const theme = useTheme();

  return (
    <Box
    id="mini-nav"
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.lighter, 0.5)} 0%, ${alpha(
          theme.palette.primary.light,
          0.5
        )} 100%)`,
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavAccount />

        <NavSectionMini
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Stack>
    </Box>
  );
}
