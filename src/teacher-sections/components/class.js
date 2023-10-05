import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
// utils
import { fPersianDate } from 'src/utils/format-time';
import { toFarsiNumber } from 'src/utils/format-number-persian';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { fGrade } from 'src/utils/format-number';
import Chart, { useChart } from 'src/components/chart';
import TaughtSkillsDialog from './taught-skill';
import IconButton from '@mui/material/IconButton';
import ModifyHomework from '../class/class-new-homework/view';
import { useNavigate } from 'react-router';
import { getGradeNumber } from '../homework/view';
import { Grid } from '@mui/material';

// ----------------------------------------------------------------------

export function ClassesHeader() {
    return (
        <Box>
            <CardHeader
                title={'کلاس‌های من'}
                sx={{ px: 1, mb: 3 }}
                action={
                    <Button
                        size="small"
                        color="inherit"
                        endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
                        component={RouterLink}
                        href={paths.teacher.classes}
                    >
                        همه کلاس‌ها
                    </Button>
                }
            />
        </Box>
    );
}

export function ClassItem({ classItem, onOpen, stackDirection = 'row', avatarPath }) {
    const router = useRouter();
    const theme = useTheme();
    // const { id, name, grade, school_name, image, last_update, student_num, progress } = class_item;
    const { id, name, grade, school_name, student_count, last_homework } = classItem;

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            {classItem && (
                <>
                    <Card
                        onClick={() =>
                            navigate(paths.teacher.class(id), { state: { name, school_name, grade: fGrade(grade) } })
                        }
                        sx={{ cursor: 'pointer' }}
                    >
                        {/* <IconButton onClick={() => onOpen(classItem.id)} sx={{ position: 'absolute', top: 16, right: 16 }}>
                        <Iconify icon="solar:add-square-line-duotone" />
                    </IconButton> */}

                        <Stack sx={{ p: 3, pb: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar
                                    alt={name}
                                    variant="rounded"
                                    sx={{ width: 64, height: 64, mb: 2 }}
                                    src={avatarPath}
                                />

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <Button
                                        size="small"
                                        color="primary"
                                        variant="contained"
                                        startIcon={<Iconify icon="ic:baseline-add" />}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setOpen(true);
                                        }}
                                    >
                                        تکلیف جدید
                                    </Button>
                                    <div onClick={(event) => event.stopPropagation()}>
                                        <Button
                                            size="small"
                                            color="secondary"
                                            variant="contained"
                                            disabled={last_homework === null ? true : false}
                                            // startIcon={<Iconify icon="ic:baseline-add" />}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                navigate(paths.teacher.homework(last_homework), { state: { id } });
                                                // router.push(paths.teacher.homework(last_homework));
                                            }}
                                        >
                                            مشاهده آخرین تکلیف
                                        </Button>
                                    </div>
                                </Box>
                            </Box>

                            <Stack direction={stackDirection} sx={{ justifyContent: 'space-between' }} spacing={2}>
                                <Box>
                                    <ListItemText
                                        sx={{ mb: 1 }}
                                        primary={<Link color="inherit">{`کلاس ${name}`}</Link>}
                                        // secondary={` به‌روزرسانی: `}
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

                                    {/* <Stack
                                    spacing={0.5}
                                    direction="row"
                                    alignItems="center"
                                    sx={{ color: 'primary.dark', typography: 'caption' }}
                                >
                                    <Iconify width={16} icon="solar:users-group-rounded-bold" />
                                    {toFarsiNumber(student_count)} دانش‌آموز
                                </Stack> */}
                                </Box>
                            </Stack>
                        </Stack>

                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
                            {[
                                {
                                    label: school_name,
                                    icon: (
                                        <Iconify
                                            width={16}
                                            icon="noto:woman-teacher-light-skin-tone"
                                            sx={{ flexShrink: 0 }}
                                        />
                                    ),
                                },
                                {
                                    label: `پایه‌ی ${fGrade(grade)}`,
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

                    <ModifyHomework classId={id} open={open} setOpen={setOpen} grade={grade} />
                </>
            )}
        </>
    );
}

ClassItem.propTypes = {
    class: PropTypes.object,
    onOpen: PropTypes.func,
};

export default function ClassList({ classesList }) {
    const [open, setOpen] = useState(false);
    const [activeClassId, setActiveClassId] = useState();

    const onOpen = (classId) => {
        setActiveClassId(classId);
        setOpen(true);
    };

    const onClose = () => {
        setActiveClassId();
        setOpen(false);
    };

    return (
        <Grid container spacing={3}>
            {classesList?.map((classItem, index) => (
                <Grid item xs={12} sm={6} md={4} >
                    <ClassItem
                        key={index}
                        classItem={classItem}
                        onOpen={onOpen}
                        avatarPath={`/assets/images/book/book_${5 - (index % 5)}.jpg`}
                    />
                </Grid>
            ))}
            <TaughtSkillsDialog open={open} onClose={onClose} classId={activeClassId} />
        </Grid>
    );
}

ClassList.propTypes = {
    classesList: PropTypes.array,
};
