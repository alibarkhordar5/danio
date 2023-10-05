import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
// utils
import { fPersianDate } from 'src/utils/format-time';
import { toFarsiNumber } from 'src/utils/format-number-persian';
import { fGrade } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import Chart, { useChart } from 'src/components/chart';
import TaughtSkillsDialog from './taught-skill';
import { useNavigate } from 'react-router';

export function HomeworkHeader() {
    return (
        <Box>
            <CardHeader
                title={'تکالیف'}
                sx={{ px: 1, mb: 3 }}
                // action={
                //     <Button
                //         size="small"
                //         color="inherit"
                //         endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
                //         component={RouterLink}
                //         href={paths.teacher.classes}
                //     >
                //         همه تکالیف
                //     </Button>
                // }
            />
        </Box>
    );
}

export function HomeworkItem({ homework_item, chartSize = 100, stackDirection = 'row', classId, grade }) {
    const router = useRouter();
    const theme = useTheme();

    const {
        avg_score,
        categories,
        class_name,
        end_date,
        icon,
        id,
        name,
        progress,
        start_date,
        class: userClass,
    } = homework_item;

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
                        formatter: () => `${toFarsiNumber(progress)}٪`,
                    },
                },
            },
        },
    });

    const navigate = useNavigate();

    console.log(icon);

    return (
        <Card
            onClick={() => navigate(paths.teacher.homework(id), { state: { classId, grade } })}
            sx={{ cursor: 'pointer' }}
        >
            {/* <IconButton onClick={() => onOpen(homework_item.id)} sx={{ position: 'absolute', top: 16, right: 16 }}>
                <Iconify icon="solar:add-square-line-duotone" />
            </IconButton> */}

            <Stack sx={{ p: 3, pb: 2 }}>
                {/* <Avatar
                    alt={name}
                    src={'/assets/images/book/book_1.jpg'}
                    variant="rounded"
                    sx={{ width: 64, height: 64, mb: 2 }}
                /> */}

                <img src={icon} alt="homework" width="64" height="64" style={{ marginBottom: 2 }} />

                <ListItemText
                    sx={{ mb: 1 }}
                    primary={<Link color="inherit">{name}</Link>}
                    primaryTypographyProps={{
                        typography: 'subtitle1',
                    }}
                />
                
                <Stack
                    direction={stackDirection}
                    sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
                    spacing={2}
                >
                    <Box>
                        <ListItemText
                            sx={{ mb: 1 }}
                            secondary={` تاریخ شروع تمرین: ${start_date?.replaceAll('-', '/')}`}
                            secondaryTypographyProps={{
                                mt: 1,
                                component: 'span',
                                typography: 'caption',
                                color: 'text.disabled',
                            }}
                        />
                        <ListItemText
                            sx={{ mb: 1 }}
                            secondary={` مهلت انجام تمرین: ${end_date?.replaceAll('-', '/')}`}
                            secondaryTypographyProps={{
                                mt: 1,
                                component: 'span',
                                typography: 'caption',
                                color: 'text.disabled',
                            }}
                        />

                        <Stack
                            spacing={0.5}
                            direction="row"
                            alignItems="center"
                            sx={{ color: 'primary.dark', typography: 'caption' }}
                        >
                            {/* {toFarsiNumber(student_num)}  */}
                            <Iconify width={16} icon="carbon:chart-average" />
                            میانگین امتیاز: {avg_score ? toFarsiNumber(avg_score) : 0}
                        </Stack>
                    </Box>
                    <Tooltip title="درصد دانش آموزانی که تکلیف را انجام داده اند" placement="top">
                        <IconButton>
                            <Chart
                                type="radialBar"
                                series={[progress]}
                                options={chartOptions}
                                width={chartSize}
                                height={chartSize}
                                sx={{ display: 'flex', justifyContent: 'center' }}
                            />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <ListItemText
                    sx={{ my: 1 }}
                    primary={'درس ها'}
                    secondary={categories?.join(', ')}
                    primaryTypographyProps={{
                        typography: 'subtitle1',
                    }}
                    secondaryTypographyProps={{
                        mt: 1,
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
                    }}
                />
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
                {[
                    {
                        label: `کلاس: ${userClass.name}`,
                        icon: <Iconify width={16} icon="noto:woman-teacher-light-skin-tone" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: `پایه‌ی ${fGrade(userClass.grade)}`,
                        icon: <Iconify width={16} icon="noto:school-backpack" sx={{ flexShrink: 0 }} />,
                    },
                ].map((item) => (
                    <Stack
                        key={item.label}
                        spacing={0.5}
                        flexShrink={0}
                        direction="row"
                        alignItems="center"
                        sx={{ color: 'text.disabled', minWidth: 0 }}
                    >
                        {item.icon}
                        <Typography variant="caption" noWrap>
                            {item.label}
                        </Typography>
                    </Stack>
                ))}
            </Box>
        </Card>
    );
}

HomeworkItem.propTypes = {
    class: PropTypes.object,
    onOpen: PropTypes.func,
};

export default function HomeworkList({ homeworkList }) {
    const [open, setOpen] = useState(false);
    const [activeClassId, setActiveClassId] = useState();

    const onOpen = (class_id) => {
        setActiveClassId(class_id);
        setOpen(true);
    };

    const onClose = () => {
        setActiveClassId();
        setOpen(false);
    };

    return (
        <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
            }}
        >
            {homeworkList.map((class_item, index) => (
                <HomeworkItem key={index} homework_item={class_item} onOpen={onOpen} />
            ))}
            <TaughtSkillsDialog open={open} onClose={onClose} classId={activeClassId} />
        </Box>
    );
}

HomeworkList.propTypes = {
    homeworkList: PropTypes.array,
};
