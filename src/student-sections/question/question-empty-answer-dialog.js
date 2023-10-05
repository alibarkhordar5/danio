// general imports
import { useImperativeHandle, useState, forwardRef } from 'react';

// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EmptyAnswerDialog = forwardRef(({ openRef, handleSubmit }) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(openRef, () => ({
        parentGetOpen() {
            return open;
        },
        parentSetOpen(state) {
            setOpen(state);
        },
    }));

    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)} fullWidth>
            <DialogTitle sx={{ fontFamily: 'Mikhak-VF' }}>پاسخ خالی</DialogTitle>
            <DialogContent>دست کم یک ورودی خالی است. پاسخ ارسال شود؟</DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} variant="outlined" color="primary" sx={{ mr: 2 }}>
                    بستن
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    تایید
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default EmptyAnswerDialog;
