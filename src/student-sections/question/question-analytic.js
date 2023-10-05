import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
// components
import Iconify from 'src/components/iconify';
// hooks
import { useTimer } from 'src/hooks/use-timer';
// utils
import { toFarsiNumber } from 'src/utils/format-number-persian';
// config
import { MAX_QUESTION_TIME } from 'src/config-global';
// ----------------------------------------------------------------------

function QuestionAnalytic({ title, description, icon, color, percent }) {
    return (
        <Stack
            spacing={{ xs: 1, md: 2.5 }}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="center"
        >
            <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
                <Iconify icon={icon} width={32} sx={{ color, position: 'absolute' }} />

                <CircularProgress
                    variant="determinate"
                    value={percent}
                    size={56}
                    thickness={2}
                    sx={{ color, opacity: 0.48 }}
                />

                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={56}
                    thickness={3}
                    sx={{
                        top: 0,
                        left: 0,
                        opacity: 0.48,
                        position: 'absolute',
                        color: (theme) => alpha(theme.palette.grey[500], 0.16),
                    }}
                />
            </Stack>

            <Stack
                spacing={0.5}
                alignItems={{ xs: 'center', md: 'unset' }}
                justifyContent={{ xs: 'center', md: 'unset' }}
            >
                <Typography variant="subtitle1">{title}</Typography>

                <Box
                    component="span"
                    sx={{
                        color: 'text.disabled',
                        typography: 'body2',
                        minWidth: '60px',
                        textAlign: { xs: 'center', md: 'left' },
                    }}
                >
                    {description}
                </Box>
            </Stack>
        </Stack>
    );
}

QuestionAnalytic.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    percent: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
};

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
        </Box>
    );
}

export default function QuestionAnalytics({ questionTime, level, levels, score }) {
    const theme = useTheme();
    const { timer, getTime } = useTimer();

    return (
        <>
            <LinearProgressWithLabel value={score} />

            <Card
                sx={{
                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                    backdropFilter: `blur(2px)`,
                    mt: 1,
                    mb: { xs: 3, md: 5 },
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                    sx={{ p: 2 }}
                >
                    <QuestionAnalytic
                        title="زمان"
                        description={toFarsiNumber(getTime(questionTime * 1000 + timer))}
                        percent={100}
                        icon="solar:sort-by-time-bold-duotone"
                        color={theme.palette.success.main}
                    />
                    <QuestionAnalytic
                        title="امتیاز"
                        description={`${toFarsiNumber(score)}`}
                        percent={score}
                        icon="solar:cup-star-bold-duotone"
                        color={theme.palette.warning.main}
                    />
                </Stack>
            </Card>
        </>
    );
}

QuestionAnalytics.propTypes = {
    questionTime: PropTypes.number,
    level: PropTypes.number,
    levels: PropTypes.number,
    score: PropTypes.number,
};
