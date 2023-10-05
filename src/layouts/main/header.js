// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgBlur } from 'src/theme/css';
// components
import Logo from 'src/components/logo';
//
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
//
import { LoginButton } from '../_common';

// ----------------------------------------------------------------------

export default function Header() {
    const theme = useTheme();

    const mdUp = useResponsive('up', 'md');

    const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

    return (
        <AppBar sx={{ boxShadow: 'none' }}>
            <Toolbar
                disableGutters
                sx={{
                    margin: { xs: 2, md: 4 },
                    borderRadius: 6,
                    height: {
                        xs: HEADER.H_MOBILE,
                        md: HEADER.H_DESKTOP,
                    },
                    ...bgBlur({
                        color: theme.palette.background.default,
                    }),
                    transition: theme.transitions.create(['height'], {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                    }),
                    ...(offsetTop && {
                        height: {
                            md: HEADER.H_DESKTOP_OFFSET,
                        },
                        ...bgBlur({
                            color: theme.palette.background.neutral,
                        }),
                    }),
                }}
            >
                <Container sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Logo />
                    {mdUp && <NavDesktop offsetTop={offsetTop} data={navConfig} />}
                    <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
                        <LoginButton />
                        {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
                    </Stack>
                </Container>
            </Toolbar>
        </AppBar>
    );
}
