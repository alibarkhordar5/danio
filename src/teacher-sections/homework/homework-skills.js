import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/system';
// components
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { MotionContainer, varSlide } from 'src/components/animate';
import { LoadingScreen } from 'src/components/loading-screen';
import CourseSection from 'src/teacher-sections/components/skill-section';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import Label from 'src/components/label';
import { toFarsiNumber } from 'src/utils/format-number-persian';
// utils
import axios, { endpoints } from 'src/utils/axios';
import { useParams } from 'src/routes/hook';
import { CardHeader, Divider } from '@mui/material';

// ----------------------------------------------------------------------

export default function HomeworkSkills({ cache, skills, setSkills }) {
    const params = useParams();
    const { id } = params;
    const settings = useSettingsContext();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!cache['skills']) {
            Promise.all([axios.get(endpoints.teacher.get_class_homework_skills(id))])
                .then((response) => {
                    const skills = response[0].data;
                    setSkills(skills || []);
                    cache.skills = skills;
                })
                .then(() => {
                    setLoading(false);
                })
                .catch((err) => {
                    enqueueSnackbar(err.detail || err.message || 'خطا در دریافت اطلاعات', { variant: 'error' });
                });
        } else {
            setSkills(cache.skills);
            setLoading(false);
        }
    }, []);

    return (
        <>
            <MotionContainer>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '50vh',
                        }}
                    >
                        <LoadingScreen />
                    </Box>
                ) : (
                    <>
                        <Card>
                            <CardHeader
                                sx={{ pr: 3.5 }}
                                title={'نام مهارت ها'}
                                action={
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="caption">میانگین امتیاز</Typography>
                                            <div
                                                style={{
                                                    width: '3px',
                                                    height: '15px',
                                                    background: 'lightgray',
                                                    margin: '0px 10px',
                                                }}
                                            />
                                            <Typography variant="caption">تکمیل شده</Typography>
                                        </Box>
                                    </>
                                }
                            />
                            <Divider sx={{ borderStyle: 'dashed', m: 2 }} />
                            <CardContent sx={{ pt: 0 }}>
                                {skills.map((skill, index) => (
                                    <Stack direction="row" alignItems="center" key={index} my={2}>
                                        <ListItemText
                                            primary={`${toFarsiNumber(index + 1)}. ${skill.name}`}
                                            primaryTypographyProps={{
                                                noWrap: false,
                                                typography: 'subtitle2',
                                            }}
                                        />
                                        <Tooltip title={'میانگین امتیاز'} placement="right">
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                sx={{ mx: 2 }}
                                                key={index}
                                                spacing={0.5}
                                            >
                                                <Typography variant="subtitle2">
                                                    {toFarsiNumber(skill.avg_score || 0)}
                                                </Typography>
                                                <Iconify icon="eva:star-fill" sx={{ color: 'warning.main' }} />
                                            </Stack>
                                        </Tooltip>
                                        <Tooltip title={'تعداد تکمیل شده'} placement="top">
                                            <Label color={'success'} sx={{ width: 64 }}>
                                                {`${toFarsiNumber(skill.number_of_practices_done)} از ${toFarsiNumber(
                                                    skill.student_count
                                                )}`}
                                            </Label>
                                        </Tooltip>
                                    </Stack>
                                ))}
                            </CardContent>
                        </Card>
                    </>
                )}
            </MotionContainer>
        </>
    );
}
