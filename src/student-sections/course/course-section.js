import React from 'react';
// @mui
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
// route
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { toFarsiNumber } from 'src/utils/format-number-persian';
// theme
import { bgGradient } from 'src/theme/css';
import { useNavigate } from 'react-router';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

function getRandomArbitrary(index) {
    return index % 3;
}

const COLORS = ['warning', 'success', 'secondary'];
const LEVELS = ['مبتدی', 'متوسط', 'پیشرفته'];

// ----------------------------------------------------------------------

function RenderSectionCard({ section }) {
    const router = useRouter();
    return (
        <Card>
            <CardHeader title={section.name} />
            <Divider sx={{ m: 3, borderStyle: 'dashed' }} />
            <CardContent sx={{ pt: 0 }}>
                {section.children.map((skill, index) => (
                    <Stack
                        onClick={() => skill.is_active && router.push(paths.student.skillQuestion(skill.key))}
                        sx={{
                            cursor: skill.is_active ? 'pointer' : 'not-allowed',
                            opacity: skill.is_active ? '1' : '0.4',
                            flexDirection: { xs: 'row', md: 'row' },
                            alignItems: { xs: 'flex-start', md: 'center' },
                        }}
                        key={index}
                        my={2}
                    >
                        <ListItemText
                            primary={`${toFarsiNumber(index + 1)}. ${skill.name}`}
                            primaryTypographyProps={{
                                noWrap: false,
                                typography: 'subtitle2',
                            }}
                        />
                        <Box
                            display="flex"
                            justifyContent={skill.number_of_compeleted_practices > 0 ? 'space-between' : 'flex-start'}
                            sx={{
                                minWidth: { xs: '50%', md: '50%' },
                                flexDirection: { xs: 'row-reverse', md: 'row' },
                            }}
                        >
                            <Stack direction="row" alignItems="center" sx={{ mx: { md: 2 } }} key={index} spacing={0}>
                                {/* <Typography variant="subtitle2">{toFarsiNumber(skill.score || 0)}</Typography> */}
                                <Tooltip
                                    // sx={{ display: { xs: 'none', md: 'block' } }}
                                    title={skill.score > 50 ? 'پیشرفته' : 'مبتدی'}
                                    placement="top"
                                >
                                    <Iconify
                                        icon="bi:check-circle-fill"
                                        sx={{
                                            color:
                                                skill.color === null
                                                    ? 'gray'
                                                    : `rgb(${skill.color[0]}, ${skill.color[1]}, ${skill.color[2]},50%)`,
                                            ml: { xs: 1.5, md: 0 },
                                            mr: { xs: 0, md: 2 },
                                            display: { xs: 'none', md: 'block' },
                                            border:
                                                skill.color === null
                                                    ? 'gray'
                                                    : `2px solid rgb(${skill.color[0]}, ${skill.color[1]}, ${skill.color[2]},100%)`,
                                            borderRadius: '100%',
                                            // display:{}
                                        }}
                                    />
                                </Tooltip>
                                <LinearProgress
                                    variant="determinate"
                                    value={skill.score}
                                    color="primary"
                                    sx={{ width: { xs: '50px', md: '100px' }, height: '7px' }}
                                />
                                <Typography sx={{ width: '20px', textAlign: 'center' }} variant="caption">
                                    {toFarsiNumber(skill.score || 0)}%
                                </Typography>
                                <Tooltip
                                    sx={{ display: 'none' }}
                                    title={skill.score > 50 ? 'پیشرفته' : 'مبتدی'}
                                    placement="top"
                                >
                                    <Iconify
                                        icon="bi:check-circle-fill"
                                        sx={{
                                            color:
                                                skill.color === null
                                                    ? 'gray'
                                                    : `rgb(${skill.color[0]}, ${skill.color[1]}, ${skill.color[2]},50%)`,
                                            ml: { xs: 1.5, md: 0 },
                                            display: { md: 'none' },
                                            border:
                                                skill.color === null
                                                    ? 'gray'
                                                    : `2px solid rgb(${skill.color[0]}, ${skill.color[1]}, ${skill.color[2]},100%)`,
                                            borderRadius: '100%',
                                            // display:{}
                                        }}
                                    />
                                </Tooltip>
                            </Stack>

                            <Box
                                sx={{
                                    opacity: skill.number_of_compeleted_practices > 0 ? 1 : 0,
                                    display: {
                                        xs: skill.number_of_compeleted_practices > 0 ? 'block' : 'none',
                                        md: 'block',
                                    },
                                }}
                            >
                                <Tooltip
                                    title={skill.number_of_compeleted_practices > 0 ? 'تعداد دفعات تکمیل شده' : null}
                                    sx={{ cursor: 'none' }}
                                    placement="top"
                                >
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}
                                            variant="caption"
                                        >
                                            x{toFarsiNumber(skill.number_of_compeleted_practices)}
                                        </Typography>
                                        <Box sx={{ width: { xs: '25px', md: '30px' } }}>
                                            <img src="/assets/icons/question/awardMedal.svg" alt="award" />
                                        </Box>
                                        <Typography
                                            sx={{ textAlign: 'center', display: { md: 'none' } }}
                                            variant="caption"
                                        >
                                            {toFarsiNumber(skill.number_of_compeleted_practices)}x
                                        </Typography>
                                    </div>
                                </Tooltip>
                            </Box>
                        </Box>

                        {/* <Label color={COLORS[index % 3]} sx={{ width: 64 }}>
                            {LEVELS[index % 3]}
                        </Label> */}
                    </Stack>
                ))}
            </CardContent>
        </Card>
    );
}

export default function CourseSection({ course }) {
    const theme = useTheme();
    const smDown = useResponsive('down', 'sm');
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Paper
                sx={{
                    borderRadius: 2,
                    cursor: 'pointer',
                    position: 'relative',
                    p: { xs: 2.5, sm: 2 },
                    mb: 2,
                    '&:hover': {
                        boxShadow: (theme) => theme.customShadows.z20,
                    },
                    boxShadow: (theme) => theme.customShadows.z8,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    ...bgGradient({
                        direction: '135deg',
                        startColor: alpha(theme.palette.primary.light, 0.16),
                        endColor: alpha(theme.palette.primary.lighter, 0.2),
                    }),
                }}
                onClick={() => setOpen((prev) => !prev)}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" px={{ xs: 0, md: 2 }}>
                    {smDown ? (
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Iconify
                                icon={course.icon}
                                width={30}
                                height={30}
                                sx={{ mr: 1.5, color: 'text.secondary' }}
                            />
                            <Typography variant="subtitle2">{course.name}</Typography>
                        </Stack>
                    ) : (
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Iconify
                                icon={course.icon || 'solar:palette-round-line-duotone'}
                                width={36}
                                height={36}
                                sx={{ mr: 1.5, color: 'text.secondary' }}
                            />
                            <Typography variant="h6">{course.name}</Typography>
                        </Stack>
                    )}

                    <Stack direction="row" alignItems="center" spacing={{ xs: 'unset', sm: 1 }}>
                        {/* {smDown ? (
                            <Tooltip title={'مرور درس'}>
                                <IconButton color="inherit" onClick={() => router.push(paths.student.courseReview)}>
                                    <Iconify
                                        icon={'material-symbols:overview-outline-rounded'}
                                        width={24}
                                        height={24}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Button
                                variant="text"
                                startIcon={
                                    <Iconify
                                        icon={'material-symbols:overview-outline-rounded'}
                                        width={24}
                                        height={24}
                                    />
                                }
                                onClick={() => router.push(paths.student.courseReview)}
                            >
                                مرور درس
                            </Button>
                        )} */}

                        <IconButton color="inherit">
                            <Iconify
                                icon={open ? 'eva:arrow-ios-upward-outline' : 'eva:arrow-ios-downward-outline'}
                                width={24}
                                height={24}
                            />
                        </IconButton>
                    </Stack>
                </Stack>
            </Paper>

            <Collapse in={open} unmountOnExit>
                <Grid container spacing={2}>
                    {course.children?.map((section, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <RenderSectionCard section={section} />
                        </Grid>
                    ))}
                </Grid>
            </Collapse>
        </div>
    );
}
