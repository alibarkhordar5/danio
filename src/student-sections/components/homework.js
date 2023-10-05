import React, { useState } from 'react';
import { m } from 'framer-motion';
// @mui
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
// components
import Chart, { useChart } from 'src/components/chart';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { MotionContainer, varSlide } from 'src/components/animate';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { toFarsiNumber } from 'src/utils/format-number-persian';
import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

export function HomeworkItem({ homework }) {
    console.log('icon', homework?.icon);
    const chartSize = 100;
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };
    const theme = useTheme();

    const chartOptions = useChart({
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        legend: {
            show: false,
        },
        fill: {
            type: 'gradient',
            gradient: {
                colorStops: [
                    { offset: 0, color: theme.palette.primary.light },
                    { offset: 100, color: theme.palette.primary.main },
                ],
            },
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '64%',
                },
                track: {
                    margin: 0,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        offsetY: 6,
                        fontSize: theme.typography.subtitle2.fontSize,
                    },
                    total: {
                        formatter: () => `${toFarsiNumber(homework.progress)}٪`,
                    },
                },
            },
        },
    });

    // Get the current date
    const currentDate = new Date();

    // Convert the provided start_date and end_date to Date objects
    const endDate = new Date(homework.end_date);

    // Calculate the time difference in milliseconds
    const timeDiff = endDate - currentDate;

    // Calculate the number of days remaining
    const daysRemaining = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return (
        <>
            <Stack
                onClick={() => router.push(paths.student.homework(homework.id))}
                component={Card}
                spacing={1}
                direction={{ xs: 'row' }}
                alignItems={{ xs: 'unset', sm: 'center' }}
                justifyContent={'space-between'}
                sx={{
                    borderRadius: 2,
                    cursor: 'pointer',
                    position: 'relative',
                    '&:hover': {
                        bgcolor: 'background.paper',
                        boxShadow: (theme) => theme.customShadows.z20,
                    },
                    px: { md: 2 },
                    py: 2,
                }}
            >
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'unset', sm: 'center' }}>
                    <img src={homework?.icon} alt="homework" width="64" height="64" />
                    <Stack direction={'column'} alignItems={'flex-start'}>
                        <>
                            <ListItemText
                                primary={homework.name}
                                secondary={homework?.categories?.join(', ')}
                                primaryTypographyProps={{
                                    noWrap: true,
                                    typography: 'subtitle2',
                                    color: 'text.primary',
                                }}
                                secondaryTypographyProps={{
                                    mt: 0.1,
                                    component: 'span',
                                    alignItems: 'center',
                                    typography: 'caption',
                                    color: 'text.disabled',
                                    display: 'inline-flex',
                                }}
                            />
                            <ListItemText
                                primary={`امتیاز: ${homework.avg_score ? homework.avg_score : '0'}`}
                                primaryTypographyProps={{
                                    noWrap: true,
                                    typography: 'subtitle2',
                                    color: 'text.primary',
                                }}
                                secondaryTypographyProps={{
                                    mt: 0.5,
                                    component: 'span',
                                    alignItems: 'center',
                                    typography: 'caption',
                                    color: 'text.disabled',
                                    display: 'inline-flex',
                                }}
                            />
                        </>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(paths.student.homeWorkQuestion(homework.current_skill, homework.id));
                            }}
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ marginTop: '10px' }}
                        >
                            انجام تکلیف
                        </Button>
                    </Stack>
                </Stack>

                <Stack direction={{ xs: 'column' }} justifyContent={'space-between'} spacing={1}>
                    <Stack
                        direction={{ xs: 'column-reverse', sm: 'row' }}
                        alignItems={'center'}
                        justifyContent={homework.comment ? 'space-between' : 'flex-end'}
                        spacing={1}
                    >
                        {homework.comment && (
                            <Tooltip title="شما یک پیام جدید از طرف معلم دارید" placement="top">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpen(true);
                                    }}
                                >
                                    پیام جدید
                                </Button>
                            </Tooltip>
                        )}

                        <Typography variant="subtitle2">
                            {' '}
                            {daysRemaining < 1 ? `مهلت انجام: کمتر از ۱ روز` : `مهلت انجام: ${daysRemaining} روز`}
                        </Typography>
                    </Stack>
                    <Stack
                        direction={{ xs: 'column-reverse', sm: 'row' }}
                        alignItems={'center'}
                        justifyContent={'center'}
                        spacing={1}
                    >
                        <Label
                            color={
                                homework.state === 'NOT_STARTED'
                                    ? 'error'
                                    : homework.state === 'UNDONE'
                                    ? 'warning'
                                    : homework.state === 'DONE'
                                    ? 'success'
                                    : 'success'
                            }
                            sx={{ width: 'auto' }}
                        >
                            {homework.state === 'NOT_STARTED'
                                ? 'شروع نکرده'
                                : homework.state === 'UNDONE'
                                ? 'ناقص'
                                : homework.state === 'DONE'
                                ? 'انجام شده'
                                : 'کامل شده'}
                        </Label>
                        <Tooltip title="درصد مهارت های تکمیل شده" placement="top">
                            <IconButton>
                                <Chart
                                    type="radialBar"
                                    series={[homework.progress]}
                                    options={chartOptions}
                                    width={chartSize}
                                    height={chartSize}
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Stack>
            <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
                <DialogContent>
                    <Typography variant="h5" sx={{ my: 3 }}>
                        پیام معلم:{' '}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, textAlign: 'justify' }}>
                        {homework.comment}
                    </Typography>
                    <Stack sx={{ justifyContent: 'flex-end', flexDirection: 'row', padding: '10px 0px' }}>
                        <Button variant="contained" size="small" color="primary" onClick={() => setOpen(false)}>
                            بستن
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}

export function HomeworkHeader() {
    return (
        <Box>
            <CardHeader
                title={'تکالیف من'}
                sx={{ px: 1, mb: 3 }}
                // action={
                //     <Button
                //         size="small"
                //         color="inherit"
                //         endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
                //         component={RouterLink}
                //         href={paths.student.homeworks}
                //     >
                //         همه تکالیف
                //     </Button>
                // }
            />
        </Box>
    );
}

export default function HomeworkSkillList({ homeworks }) {
    return (
        <MotionContainer>
            <Stack spacing={2}>
                {homeworks &&
                    homeworks.map((homework, index) => (
                        <Box component={m.div} variants={varSlide().inUp}>
                            <HomeworkItem homework={homework} key={index} />
                        </Box>
                    ))}
            </Stack>
        </MotionContainer>
    );
}
