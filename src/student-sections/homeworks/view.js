import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'src/components/snackbar';
import { alpha } from '@mui/material/styles';
// components
import { useSettingsContext } from 'src/components/settings';
import { MotionContainer, varSlide } from 'src/components/animate';
import HomeworkFolder from './homework-folder';
import HomeworkSkillList, { HomeworkItem } from '../components/homework';
import { useEffect, useState } from 'react';
import { LoadingScreen } from 'src/components/loading-screen';

//axios
import axios, { endpoints } from 'src/utils/axios';
import { useAuthContext } from 'src/auth/hooks';
import { Card, Grid } from '@mui/material';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeworksView() {
    const settings = useSettingsContext();
    const { user } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();

    const [homeworkList, setHomeworkList] = useState(null);
    console.log('homeworkList', homeworkList);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([axios.get(endpoints.student.homeworks(user.class.id))])
            .then((response) => {
                const homeworkList = response[0].data;
                // console.log('homeworkList', homeworkList);
                setHomeworkList(homeworkList);
            })
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
    }, []);

    return (
        <>
            <Container maxWidth={settings.themeStretch ? false : 'xl'}>
                {/* present */}
                <Typography
                    variant="h4"
                    sx={{
                        mt: 2,
                        mb: 6,
                    }}
                >
                    تکالیف جاری من
                </Typography>

                {loading ? (
                    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LoadingScreen />
                    </Box>
                ) : homeworkList.current_homeworks.length > 0 ? (
                    <>
                        {' '}
                        <MotionContainer>
                            <Box
                                gap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(1, 1fr)',
                                    md: 'repeat(1, 1fr)',
                                }}
                            >
                                {homeworkList.current_homeworks.map((homework) => (
                                    <Box component={m.div} variants={varSlide().inUp}>
                                        <HomeworkItem homework={homework} />
                                    </Box>
                                ))}
                            </Box>
                        </MotionContainer>
                    </>
                ) : (
                    <Card
                        component="div"
                        sx={{
                            bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                            backdropFilter: `blur(2px)`,
                            padding: '15px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>تکلیفی وجود ندارد</Typography>
                    </Card>
                )}

                {/* future */}
                <Typography
                    variant="h4"
                    sx={{
                        mt: 5,
                        mb: 6,
                    }}
                >
                    تکالیف آینده
                </Typography>

                {loading ? (
                    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LoadingScreen />
                    </Box>
                ) : homeworkList.future_homeworks.length > 0 ? (
                    <>
                        {' '}
                        <MotionContainer>
                            <Box
                                gap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(1, 1fr)',
                                    md: 'repeat(1, 1fr)',
                                }}
                            >
                                {homeworkList.future_homeworks.map((homework) => (
                                    <Box component={m.div} variants={varSlide().inUp}>
                                        <HomeworkItem homework={homework} />
                                    </Box>
                                ))}
                            </Box>
                        </MotionContainer>
                    </>
                ) : (
                    <Card
                        component="div"
                        sx={{
                            bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                            backdropFilter: `blur(2px)`,
                            padding: '15px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>تکلیفی وجود ندارد</Typography>
                    </Card>
                )}

                {/* past */}
                <Typography
                    variant="h4"
                    sx={{
                        mt: 5,
                        mb: 6,
                    }}
                >
                    تکالیف گذشته
                </Typography>

                {loading ? (
                    <Box sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LoadingScreen />
                    </Box>
                ) : homeworkList.previous_homeworks.length > 0 ? (
                    <>
                        {' '}
                        <MotionContainer>
                            <Box
                                gap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(1, 1fr)',
                                    md: 'repeat(1, 1fr)',
                                }}
                            >
                                {homeworkList.previous_homeworks.map((homework) => (
                                    <Box component={m.div} variants={varSlide().inUp}>
                                        <HomeworkItem homework={homework} />
                                    </Box>
                                ))}
                            </Box>
                        </MotionContainer>
                    </>
                ) : (
                    <Card
                        component="div"
                        sx={{
                            bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                            backdropFilter: `blur(2px)`,
                            padding: '15px 20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>تکلیفی وجود ندارد</Typography>
                    </Card>
                )}
            </Container>
        </>
    );
}
