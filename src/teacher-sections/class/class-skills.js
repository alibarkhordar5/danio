import { m } from 'framer-motion';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// components
import { useSettingsContext } from 'src/components/settings';
import { MotionContainer, varSlide } from 'src/components/animate';
import CourseSection from './class-course-section';
import CommingSoon from '../components/coming-soon';
import { useEffect, useState } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ClassSkills({ cache, classId }) {
    const [skills, setSkills] = useState([]);

    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!cache['skills']) {
            axios
                .get(endpoints.teacher.get_skills_by_class(classId))
                .then((response) => {
                    setSkills(response.data.categories);
                    cache.skills = response.data.categories;
                    setLoading(false);
                })
                .catch((error) => {
                    enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                        variant: 'error',
                    });
                    setLoading(false);
                });
        } else {
            setSkills(cache.skills);
            setLoading(false);
        }
    }, []);

    return (
        <Box>
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
                    skills.length > 0 &&
                    skills.map((item, index) => (
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
                            <CourseSection course={item} />
                        </Box>
                    ))
                )}
            </MotionContainer>
        </Box>
    );
}
