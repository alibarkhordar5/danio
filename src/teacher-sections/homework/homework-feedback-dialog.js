import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useSnackbar } from 'src/components/snackbar';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// assets
import { teacherMessages } from 'src/assets/data/teacher-dialog-messages';
import axios, { endpoints } from 'src/utils/axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function HomeworkFeedbackDialog({ getClassData, callBack, student_id, homework_id, open, onClose, message, setMessage }) {
    const HomeworkFeedbackSchema = Yup.object().shape({
        message: Yup.string().required('لطفاً پیام خود را وارد نمایید'),
    });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // const [msg, setMsg] = useState(message);

    // console.log('message', message);
    // log

    // console.log('message', message);

    // useEffect(() => {
    //     setMsg(message);
    // }, [message]);

    // useEffect(() => {
    //     setMsg('');
    // }, [open]);

    const defaultValues = {
        message: message,
    };

    const methods = useForm({
        resolver: yupResolver(HomeworkFeedbackSchema),
        message: message,
    });

    const {
        reset,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        const _data = {
            ...data,
            student: student_id,
            homework: homework_id,
        };

        axios
            .post(endpoints.teacher.comment(homework_id), { comment: _data.message, user_id: student_id })
            .then(() => {
                enqueueSnackbar('پیام با موفقیت ارسال شد');
                onClose();
            })
            .then(() => {
                callBack()
                getClassData()
            })
            .catch((error) => {
                enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                    variant: 'error',
                });
            });
        // TODO: post data
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogTitle>پیام برای دانش‌آموز</DialogTitle>

                <DialogContent>
                    <Typography sx={{ mb: 3 }}>لطفاً بازخورد خود را در رابطه با تکلیف وارد نمایید. </Typography>
                    <RHFTextField
                        defaultValue={message}
                        // onChange={(e) => setMsg(e.target.value)}
                        autoFocus
                        multiline
                        name="message"
                        label="پیام"
                        minRows={4}
                    />
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ my: 2 }}
                        flexWrap={'wrap'}
                        justifyContent={'space-between'}
                    >
                        {teacherMessages.map((msg, index) => (
                            <Chip
                                key={index}
                                clickable
                                variant={'soft'}
                                color="primary"
                                label={msg}
                                onClick={() => {
                                    setValue('message', msg)
                                }}
                            />
                        ))}
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {
                        setValue('message', '')
                        onClose()
                        }} variant="outlined" color="primary">
                        بستن
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        ثبت
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
}

HomeworkFeedbackDialog.propTypes = {
    student_id: PropTypes.number,
    homework_id: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};
