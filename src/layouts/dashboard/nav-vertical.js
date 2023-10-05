import PropTypes from 'prop-types';
import { useEffect } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import Logo from 'src/components/logo';
import { usePathname } from 'src/routes/hook';
import { NavSectionVertical } from 'src/components/nav-section';
import NavAccount from 'src/components/nav-section/vertical/nav-account';
import { StyledScrollbar } from 'src/components/nav-section/vertical/styles';
//
import { NAV } from '../config-layout';
import useNavData from './config-navigation';
import { NavToggleButton, NavIllustration } from '../_common';

// ----------------------------------------------------------------------

export default function NavVertical({ openNav, onCloseNav }) {
    const { user } = useAuthContext();

    const pathname = usePathname();

    const lgUp = useResponsive('up', 'lg');

    const navData = useNavData();

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderContent = (
        <StyledScrollbar>
            <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />

            <NavAccount />

            <NavSectionVertical
                data={navData}
                config={{
                    currentRole: user?.role || 'admin',
                }}
            />

            <Box sx={{ flexGrow: 1 }} />

      {user?.role === 'STUDENT' && <NavIllustration />}
    </StyledScrollbar>
  );

    return (
        <Box
        id="vertical-nav"
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.W_VERTICAL },
            }}
        >
            <NavToggleButton />

            {lgUp ? (
                <Stack
                    sx={{
                        height: 1,
                        position: 'fixed',
                        width: NAV.W_VERTICAL,
                        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                >
                    {renderContent}
                </Stack>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    PaperProps={{
                        sx: {
                            width: NAV.W_VERTICAL,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}

NavVertical.propTypes = {
    onCloseNav: PropTypes.func,
    openNav: PropTypes.bool,
};
