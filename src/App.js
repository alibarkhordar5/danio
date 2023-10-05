// scroll bar
import 'simplebar-react/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ----------------------------------------------------------------------
// Localization
import jMoment from 'moment-jalaali';
import AdapterJalali from '@date-io/jalaali';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { faIR } from '@mui/x-date-pickers/locales';

// redux
import ReduxProvider from 'src/redux/redux-provider';
// routes
import Router from 'src/routes/sections';
// theme
import ThemeProvider from 'src/theme';
// hooks
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
// components
import ProgressBar from 'src/components/progress-bar';
import MotionLazy from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

export default function App() {
    useScrollToTop();

    return (
        <AuthProvider>
            <ReduxProvider>
                <LocalizationProvider
                    dateAdapter={AdapterJalali}
                    localeText={faIR.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <SettingsProvider
                        defaultSettings={{
                            themeMode: 'light', // 'light' | 'dark'
                            themeDirection: 'rtl', //  'rtl' | 'ltr'
                            themeContrast: 'default', // 'default' | 'bold'
                            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                            themeStretch: false,
                        }}
                    >
                        <ThemeProvider>
                            <MotionLazy>
                                <SnackbarProvider>
                                    <SettingsDrawer />
                                    <ProgressBar />
                                    <AuthConsumer>
                                        <Router />
                                    </AuthConsumer>
                                </SnackbarProvider>
                            </MotionLazy>
                        </ThemeProvider>
                    </SettingsProvider>
                </LocalizationProvider>
            </ReduxProvider>
        </AuthProvider>
    );
}
