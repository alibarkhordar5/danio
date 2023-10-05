import React from 'react';
// @mui
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { toFarsiNumber } from 'src/utils/format-number-persian';
// theme
import { bgGradient } from 'src/theme/css';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

function getRandomArbitrary(index) {
    return index % 3;
}

const COLORS = ['warning', 'success', 'secondary'];
const LEVELS = ['مبتدی', 'متوسط', 'پیشرفته'];

// ----------------------------------------------------------------------

function RenderSkill({ skill, number }) {
    const router = useRouter();
    const theme = useTheme();
    const darkeningFactor = 0.8;
    const getColor = (number) => {
        const red = 350 - (number * 350) / 100; // Adjust the factor for lighter red
        const green = (number * 350) / 100; // Adjust the factor for lighter green
        return `rgb(${red}, ${green}, 0)`;
    };
    return (
        <Stack
            onClick={() => router.push(paths.teacher.skillQuestion(skill.key))}
            sx={{ cursor: 'pointer' }}
            direction="row"
            alignItems="center"
            my={2}
        >
            <ListItemText
                primary={`${toFarsiNumber(number)}. ${skill.name}`}
                primaryTypographyProps={{
                    noWrap: false,
                    typography: 'subtitle2',
                }}
            />
            <>
                <Stack direction="row" alignItems="center" sx={{ mx: 2 }} spacing={0.5}></Stack>

                <Box
                    sx={{
                        minWidth: 64,
                        backgroundColor:
                            skill.avg_score === null
                                ? 'lightgray'
                                : `rgb(${skill.color[0]}, ${skill.color[1]}, ${skill.color[2]},5%)`,
                        textAlign: 'center',
                        borderRadius: '8px',
                        border:
                            skill.avg_score === null
                                ? '1px solid lightgray'
                                : `1px solid rgb(${skill.color[0]}, ${skill.color[1]}, ${skill.color[2]},100%)`,
                        color:
                            skill.avg_score === null
                                ? 'gray'
                                : `rgb(${Math.round(skill.color[0] * darkeningFactor)}, ${Math.round(
                                      skill.color[1] * darkeningFactor
                                  )}, ${Math.round(skill.color[2] * darkeningFactor)}, 100%)`,
                        fontWeight: 'bolder',
                    }}
                >
                    <Box sx={{ mx: 1 }}>{skill.avg_score === null ? '-' : toFarsiNumber(skill.avg_score)}</Box>
                </Box>
            </>
        </Stack>
    );
}

function RenderSectionCard({ section }) {
    return (
        <Card>
            <CardHeader
                sx={{ pr: 3.5 }}
                title={section.name}
                action={
                    <>
                        <Typography variant="caption">میانگین امتیاز</Typography>
                    </>
                }
            />
            <Divider sx={{ m: 3, borderStyle: 'dashed' }} />
            <CardContent sx={{ pt: 0 }}>
                {section.children &&
                    section.children.map((skill, index) => (
                        <RenderSkill key={index} skill={skill} number={index + 1} />
                    ))}
            </CardContent>
        </Card>
    );
}

export default function CourseSection({ course }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Paper
                onClick={() => setOpen((prev) => !prev)}
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
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" px={{ xs: 0, md: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Iconify
                            icon={'icon-park-outline:lattice-pattern'}
                            width={36}
                            height={36}
                            sx={{ mr: 1.5, color: 'text.secondary' }}
                        />
                        <Typography variant="h6">{course.name}</Typography>
                    </Stack>

                    <IconButton color="inherit">
                        <Iconify icon={open ? 'eva:arrow-ios-upward-outline' : 'eva:arrow-ios-downward-outline'} />
                    </IconButton>
                </Stack>
            </Paper>

            <Collapse in={open} unmountOnExit>
                <Grid container spacing={2}>
                    {course.children.length > 0 &&
                        course.children?.map((section, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <RenderSectionCard section={section} />
                            </Grid>
                        ))}
                </Grid>
            </Collapse>
        </div>
    );
}
