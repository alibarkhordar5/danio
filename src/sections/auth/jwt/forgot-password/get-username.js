import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RenderGetUsername({ onSubmitUsername }) {
  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    username: Yup.string()
      .required('لطفاً نام کاربری خود را وارد کنید.')
      .typeError('لطفاً نام کاربری خود را وارد کنید.'),
  });

  const defaultValues = {
    username: '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const _onSubmit = handleSubmit(async (data) => {
    await onSubmitUsername(data.username);
  });

  return (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ color: 'text.secondary', alignSelf: 'flex-start' }}>
        نام کاربری خود را وارد نمایید.
      </Typography>

      <FormProvider methods={methods} onSubmit={_onSubmit}>
        <Stack spacing={3}>
          <RHFTextField name="username" label="نام کاربری " />

          <LoadingButton
            fullWidth
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            ارسال درخواست
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
