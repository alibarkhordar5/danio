import { useState } from 'react';
// @mui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
import { RouterLink } from 'src/routes/components';
// utils
import axios, { endpoints } from 'src/utils/axios';
// components
import { useSnackbar } from 'src/components/snackbar';
import RenderGetUsername from './get-username';
import RenderNewPassword from './enter-new-password';
import RenderVerifyCode from '../login/verify-code';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');
  const [codeHasSent, setCodeHasSent] = useState(false);
  const [codeHasVeriefied, setCodeHasVeriefied] = useState(false);
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  async function onSubmitUsername(username) {
    try {
      await axios
        .get(endpoints.auth.reset_token, {
          params: {
            username: username,
          },
        })
        .then((response) => {
          setPhone(response.phone);
          setUsername(username);
          setCodeHasSent(true);
          setErrorMsg('');
        })
        .catch((error) =>
          setErrorMsg(typeof error === 'string' ? error : error.message || error.detail || 'خطا در ارسال نام کاربری')
        );
    } catch (error) {
      setErrorMsg(typeof error === 'string' ? error : error.message || error.detail || 'خطا در ارسال نام کاربری');
    }
  }

  async function onSubmitCode(code) {
    try {
      await axios
        .post(endpoints.auth.verify_reset_token, { username: username, code: code })
        .then((response) => {
          setCode(code);
          setCodeHasVeriefied(true);
        })
        .catch((error) =>
          setErrorMsg(typeof error === 'string' ? error : error.message || error.detail || 'خطا در ارسال')
        );
    } catch (error) {
      setErrorMsg(error);
    }
  }

  async function onSubmitNewPassword(newPass) {
    try {
      await axios
        .put(endpoints.auth.reset_password, { code: code, new_password: newPass, username: username })
        .then((response) => {
          enqueueSnackbar('رمز عبور با موفقیت تغییر یافت', {
            variant: 'success',
          });
          router.push(paths.auth.jwt.login);
        })
        .catch((error) =>
          setErrorMsg(typeof error === 'string' ? error : error.message || error.detail || 'خطا در تغییر رمز')
        );
    } catch (error) {
      setErrorMsg(typeof error === 'string' ? error : error.message || error.detail || 'خطا در تغییر رمز');
    }
  }

  return (
    <Grid container spacing={8} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6} sx={{ pt: 0 }}>
        <Stack spacing={2}>
          <Typography variant="h3" sx={{ alignSelf: 'flex-start' }}>
            رمز عبور خود را فراموش کرده‌اید؟
          </Typography>

          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          {!codeHasSent ? (
            <RenderGetUsername onSubmitUsername={onSubmitUsername} />
          ) : !codeHasVeriefied ? (
            <Stack spacing={2}>
              <Typography variant="body2" sx={{ color: 'text.secondary', alignSelf: 'flex-start' }}>
                کد ارسال شده برای شماره تلفن &nbsp;{phone}&nbsp; را وارد کنید.
              </Typography>

              <RenderVerifyCode onSubmitCode={onSubmitCode} />
            </Stack>
          ) : (
            <RenderNewPassword onSubmitNewPassword={onSubmitNewPassword} />
          )}

          <Link
            component={RouterLink}
            href={paths.auth.jwt.login}
            variant="body2"
            color="inherit"
            sx={{ cursor: 'pointer' }}
          >
            بازگشت به صفحه ورود
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={9} md={6} sx={{ pt: 0 }}>
        <Box
          component="img"
          src="/assets/illustrations/characters/character_19.jpg"
          sx={{ maxHeight: { xs: 240, md: 360 } }}
        />
      </Grid>
    </Grid>
  );
}
