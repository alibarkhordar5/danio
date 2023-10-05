import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RenderNewPassword({ onSubmitNewPassword }) {
  const schema = Yup.object().shape({
    new_password: Yup.string()
      .required('لطفا رمز عبور خود را وارد نمایید.')
      .typeError('لطفاً رمز عبور خود را وارد نمایید.'),
  });

  const defaultValues = {
    new_password: '',
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
    await onSubmitNewPassword(data.new_password);
  });

  return (
    <Stack spacing={2}>
      <Typography variant="body2" sx={{ color: 'text.secondary', alignSelf: 'flex-start' }}>
        رمز عبور جدید را تعریف کنید.
      </Typography>

      <FormProvider methods={methods} onSubmit={_onSubmit}>
        <Stack spacing={3}>
          <RHFTextField name="new_password" label="رمز عبور جدید" />

          <LoadingButton
            fullWidth
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            تغییر رمز
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
