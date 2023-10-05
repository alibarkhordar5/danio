import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
// utils
import { fFaToEnNumber } from 'src/utils/format-number-persian';
// components
import FormProvider, { RHFCode } from 'src/components/hook-form';

export default function RenderVerifyCode({ onSubmitCode }) {
  const VerifySchema = Yup.object().shape({
    code: Yup.string().min(6, 'حداقل ۶ کاراکتر').required('لطفا کد تایید را وارد نمایید.'),
  });

  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isLoading },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await onSubmitCode(fFaToEnNumber(data.code));
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} alignItems="center">
        <RHFCode name="code" />

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isLoading}
        >
          ارسال
        </LoadingButton>

        {/* <Typography variant="body2">
          {`کد ارسال نشده است ؟`}
          <Button variant="text" color="primary" onClick={() => onResend(phone)}>
            ارسال دوباره
          </Button>
        </Typography> */}
      </Stack>
    </FormProvider>
  );
}
