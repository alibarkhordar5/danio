import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { fFaStringToEnDigit } from 'src/utils/format-number-persian';

// ----------------------------------------------------------------------

export default function TaughtSkillsDialog({ classId, open, onClose }) {
  const TaughtSkillsSchema = Yup.object().shape({
    start_page: Yup.string().required('لطفاً صفحه شروع را وارد نمایید'),
    end_page: Yup.string().required('لطفاً صفحه‌ پایان را وارد نمایید'),
  });

  const defaultValues = {
    start_page: '',
    end_page: '',
  };

  const methods = useForm({
    resolver: yupResolver(TaughtSkillsSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const _data = {
      start_page: fFaStringToEnDigit(data.start_page),
      end_page: fFaStringToEnDigit(data.end_page),
      class: classId,
    };
    console.log(_data);
    // TODO: post data
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>صفحات تدریس شده</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>لطفاً صفحات تدریس شده در کلاس را وارد نمایید. </Typography>
          <Stack direction="row" spacing={2}>
            <RHFTextField autoFocus name="start_page" label="صفحه شروع" />
            <RHFTextField name="end_page" label="صفحه پایان" />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="primary">
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

TaughtSkillsDialog.propTypes = {
  classId: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
