import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// utils
import { fFaToEnNumber, toFarsiNumber } from 'src/utils/format-number-persian';
// components
import FormProvider, { RHFCode } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterVerifyForm({ onVerifyCode, phone, onResend }) {
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
    formState: { isSubmitting, isLoading, isSubmitted },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    onVerifyCode(fFaToEnNumber(data.code));
  });

  const renderForm = (
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
        تایید
      </LoadingButton>

      <Typography variant="body2">
        {`کد ارسال نشده است ؟`}
        <Button variant="text" color="primary" onClick={() => onResend(phone)}>
          ارسال دوباره
        </Button>
      </Typography>
    </Stack>
  );

  const renderHead = (
    <Stack spacing={1} sx={{ my: 5 }} alignItems={'center'}>
      <Typography variant="h3">لطفا پیامک خود را بررسی نمایید !</Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        دانیو یک کد تایید ۶ رقمی برای شماره تلفن {toFarsiNumber(phone)} ارسال کرده. لطفا برای ثبت نام نهایی آن را در
        قسمت زیر وارد کنید.
      </Typography>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
