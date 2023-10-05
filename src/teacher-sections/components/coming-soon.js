import PropTypes from 'prop-types';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// theme
import { bgGradient } from 'src/theme/css';
import { SeoIllustration } from 'src/assets/illustrations';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function ComingSoon() {
    const theme = useTheme();

    return (
        <Stack
            // display={'flex'}
            flexDirection={{ xs: 'column', md: 'row' }}
            sx={{
                ...bgGradient({
                    direction: '135deg',
                    startColor: alpha(theme.palette.primary.light, 0.1),
                    endColor: alpha(theme.palette.primary.main, 0.1),
                }),
                height: { md: 1 },
                borderRadius: 2,
                position: 'relative',
                color: 'primary.darker',
                backgroundColor: 'common.white',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
                // width: '100%',
            }}
        >
            <Stack
                flexGrow={1}
                justifyContent="center"
                alignItems={{ xs: 'center', md: 'flex-start' }}
                sx={{
                    p: {
                        xs: theme.spacing(5, 3, 0, 3),
                        md: theme.spacing(5),
                    },
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                <Typography paragraph variant="h4" sx={{ whiteSpace: 'pre-line' }}>
                    بزودی
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        opacity: 0.8,
                        maxWidth: 360,
                        mb: { xs: 3, xl: 5 },
                    }}
                >
                    {'درحال حاضر این بخش از سایت در دسترس نیست'}
                </Typography>
            </Stack>

            <Stack
                component="span"
                justifyContent="center"
                sx={{
                    p: { xs: 0, md: 3 },
                    maxWidth: 360,

                    mx: 'auto',
                }}
            >
                <SeoIllustration />
            </Stack>
        </Stack>
    );
}
