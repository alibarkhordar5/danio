import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// theme
import { bgGradient } from 'src/theme/css';
import { useEffect, useState } from 'react';
import HomeworkFeedbackDialog from '../homework/homework-feedback-dialog';
// ----------------------------------------------------------------------

export default function TeachersMessage({ message, img, update, homeworkId, isStudnet = false, studentId, ...other }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    // useEffect(() => {

    // }, [open])

    return (
        <Stack
            flexDirection="column"
            sx={{
                ...bgGradient({
                    direction: '135deg',
                    startColor: theme.palette.primary.main,
                    endColor: theme.palette.primary.dark,
                }),

                p: { xs: 4, md: 4 },
                borderRadius: 2,
                position: 'relative',
                color: 'common.white',
            }}
            {...other}
        >
            <Typography variant="h4">پیام معلم</Typography>
            {img && (
                <Stack
                    component="span"
                    justifyContent="center"
                    sx={{
                        p: { xs: 6, md: 4 },
                        maxWidth: 360,
                        mx: 'auto',
                    }}
                >
                    {img}
                </Stack>
            )}
            <Typography>{message}</Typography>

            {!isStudnet && (
                <Button
                    onClick={() => {
                        update();
                        setOpen(true);
                    }}
                    size="small"
                    variant="contained"
                >
                    مشاهده پیام
                </Button>
            )}

            <HomeworkFeedbackDialog
                homework_id={homeworkId}
                student_id={studentId}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            />
        </Stack>
    );
}

TeachersMessage.propTypes = {
    img: PropTypes.node,
    message: PropTypes.string,
};
