import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// components
import { useSettingsContext } from 'src/components/settings';
//
import Main from './main';
import Header from './header';
import NavMini from './nav-mini';
import NavVertical from './nav-vertical';
import NavHorizontal from './nav-horizontal';
import NavMobile from './nav-mobile';
import { useAuthContext } from 'src/auth/hooks';
import { ROLES } from 'src/config-global';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
    const settings = useSettingsContext();
    const { user } = useAuthContext();

    const lgUp = useResponsive('up', 'lg');

    const mdUp = useResponsive('up', 'lg');

    const nav = useBoolean();

    const isHorizontal = settings.themeLayout === 'horizontal';

    const isMini = settings.themeLayout === 'mini';

    const renderNavMini = <NavMini />;

    const renderHorizontal = <NavHorizontal />;

    const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

    const renderNavMobile = <NavMobile />;

    if (isHorizontal) {
        return (
            <>
                <Header onOpenNav={nav.onTrue} />

                {lgUp ? renderHorizontal : renderNavVertical}

                <Main>{children}</Main>

                {!mdUp && renderNavMobile}
            </>
        );
    }

    if (isMini) {
        return (
            <>
                <Header onOpenNav={nav.onTrue} />

                <Box
                    sx={{
                        minHeight: 1,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    {lgUp ? renderNavMini : renderNavVertical}

                    <Main>{children}</Main>

                    {!mdUp && renderNavMobile}
                </Box>
            </>
        );
    }

    return (
        <>
            {/* {user && user.role === ROLES.teacher && <Header onOpenNav={nav.onTrue} />} */}

            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                }}
            >
                {renderNavVertical}

                <Main sx={{pb: {xs: 12, lg: 0}}}>{children}</Main>

                {!mdUp && renderNavMobile}
            </Box>
        </>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node,
};
