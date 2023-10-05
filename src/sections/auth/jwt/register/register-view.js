import { useState } from 'react';
// @mui
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
// auth
import { useAuthContext } from 'src/auth/hooks';
// utils
import axios, { endpoints } from 'src/utils/axios';
import { fFaToEnNumber } from 'src/utils/format-number-persian';
// components
import { useSnackbar } from 'src/components/snackbar';

import RegisterFormView from './register-form-view';
import RegisterVerifyForm from './register-verify-phone';

// ----------------------------------------------------------------------

const REGISTER_STATES = { 1: 'COMPLETE_FORM', 2: 'SEND_VRIFICATION_CODE' };

// ----------------------------------------------------------------------

export default function RegisterView() {
  const { register } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const [data, setData] = useState({ phone: '09121234567' });
  const [state, setState] = useState(REGISTER_STATES[1]);
  const [errorMsg, setErrorMsg] = useState('');

  const sendVerificationCode = async (phone) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      //     setState(REGISTER_STATES[2]);
      await axios.get(`${endpoints.auth.create_verification_code}?phone=${fFaToEnNumber(phone)}`).then((response) => {
        if (response.data?.status === 1) {
          enqueueSnackbar('کد تایید با موفقیت ارسال شد.', { variant: 'success' });
          setState(REGISTER_STATES[2]);
        } else enqueueSnackbar(response.data?.message || 'خطا در ارسال کد تایید', { variant: 'error' });
      });
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const onSubmitForm = (data) => {
    sendVerificationCode(fFaToEnNumber(data.phone));
    setData(data);
  };

  const onVerifyCode = async (code) => {
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 500));
      await register?.({
        ...data,
        code: fFaToEnNumber(code),
        phone: fFaToEnNumber(data.phone),
        gender: data.gender?.name,
        grade: data.grade?.id,
      });
      enqueueSnackbar('ثبت نام شما با موفقیت انجام شد.', { variant: 'success' });
      router.push(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ position: 'relative', mb: 2 }}>
      <Typography variant="h4">ساخت حساب کاربری جدید</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> حساب کاربری دارید؟ </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          ورود
        </Link>
      </Stack>
    </Stack>
  );

  return (
    <Grid container spacing={8} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid item xs={12} md={7}>
        <>
          {renderHead}

          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          {state === 'COMPLETE_FORM' && <RegisterFormView onSubmitForm={onSubmitForm} />}

          {state === 'SEND_VRIFICATION_CODE' && (
            <RegisterVerifyForm onVerifyCode={onVerifyCode} phone={data.phone} onResend={sendVerificationCode} />
          )}
        </>
      </Grid>
      <Grid item xs={9} md={5}>
        <Box
          component="img"
          src="/assets/illustrations/characters/character_12.jpg"
          sx={{ maxHeight: { xs: 240, md: 360 } }}
        />
      </Grid>
    </Grid>
  );
}
