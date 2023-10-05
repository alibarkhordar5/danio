import PropTypes from 'prop-types';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function HomeWelcome({ title, description, action, img, ...other }) {
    const theme = useTheme();

    return (
        <Stack
            flexDirection={{ xs: 'row', md: 'row' }}
            sx={{
                ...bgGradient({
                    direction: '135deg',
                    startColor: alpha(theme.palette.primary.light, 0.2),
                    endColor: alpha(theme.palette.primary.main, 0.2),
                }),
                height: { md: 1 },
                borderRadius: 2,
                position: 'relative',
                color: 'primary.darker',
                backgroundColor: 'common.white',
                mt: { xs: -2, md: 0 },
            }}
            {...other}
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
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        opacity: 0.8,
                        maxWidth: 360,

                        mb: { xs: 3, xl: 5 },
                    }}
                >
                    {description}
                </Typography>

                {action && action}
            </Stack>

            {img && (
                <Stack
                    component="span"
                    justifyContent="center"
                    sx={{
                        p: { xs: 2, md: 3 },
                        maxWidth: 360,
                        mx: 'auto',
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    {img}
                </Stack>
            )}
        </Stack>
    );
}

HomeWelcome.propTypes = {
    action: PropTypes.node,
    description: PropTypes.string,
    img: PropTypes.node,
    title: PropTypes.string,
};
