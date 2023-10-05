import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// components
import { useSettingsContext } from 'src/components/settings';
import { MotionContainer, varSlide } from 'src/components/animate';
import { LoadingScreen } from 'src/components/loading-screen';
import CourseSection from './course-section';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
// utils
import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function CourseView() {
    const [items, setItems] = useState([]);
    const settings = useSettingsContext();
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuthContext();

    const id = user?.class?.id;

    useEffect(() => {
        axios
            .get(endpoints.skills.get(id))
            .then((res) => {
                setItems(res.data?.categories || []);
            })
            .catch((err) => {
                enqueueSnackbar(err.detail || err.message || 'خطا در دریافت اطلاعات', { variant: 'error' });
            });
    }, []);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Typography
                variant="h4"
                sx={{
                    mt: 2,
                    mb: 4,
                }}
            >
                درس
            </Typography>

            <MotionContainer>
                {items.length === 0 ? (
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
                    items
                        .filter((course) => course.is_available)
                        .map((course, index) => (
                            <Box
                                key={index}
                                component={m.div}
                                variants={varSlide().inUp}
                                sx={{
                                    my: 2,
                                    borderRadius: 1,
                                    objectFit: 'cover',
                                }}
                            >
                                <CourseSection course={course} />
                            </Box>
                        ))
                )}
            </MotionContainer>
        </Container>
    );
}
