// general imports
import { forwardRef } from 'react';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// custom components
import FormProvider from 'src/components/hook-form';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LargeView({ open, setOpen, methods, onSubmit, children, isEdit }) {
    return (
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={() => setOpen(false)} fullWidth>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogTitle sx={{ fontFamily: 'Mikhak-VF' }}>{isEdit ? 'ویرایش تکلیف' : 'تکلیف جدید'}</DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} variant="outlined" color="primary" sx={{ mr: 2 }}>
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
