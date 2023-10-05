import { memo } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
// theme
import { bgBlur } from 'src/theme/css';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// components
import { NavSectionHorizontal } from 'src/components/nav-section';
//
import useNavData from './config-navigation';
import { HeaderShadow } from '../_common';

// ----------------------------------------------------------------------

function NavMobile() {
  const theme = useTheme();

  const { user } = useMockedUser();

  const navData = useNavData();

  return (
    <Paper
    id="mobile-nav"
      component="nav"
      sx={{
        zIndex: 3,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.lighter, 0.9)} 0%, ${alpha(
          theme.palette.primary.light,
          0.9
        )} 100%)`,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <NavSectionHorizontal
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Toolbar>

      <HeaderShadow />
    </Paper>
  );
}

export default memo(NavMobile);
