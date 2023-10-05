import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserPassLogin({ toggleLoginShape }) {
  const { login } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('نام کاربری'),
    password: Yup.string().required('رمز عبور'),
  });

  const defaultValues = {
    username: 'danesh_t1',
    password: 'danesh_t1',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.username, data.password);
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : 'کاربری با مشخصات وارد شده پیدا نشد!');
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">ورود به دانیو</Typography>

      <Stack spacing={1} alignItems={'flex-start'}>
        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          ساخت حساب کاربری جدید
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="username" label="نام کاربری" />

      <RHFTextField
        name="password"
        label="رمز عبور"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton fullWidth color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
        ورود
      </LoadingButton>

      <Link variant="body2" color="inherit" sx={{ cursor: 'pointer' }} onClick={toggleLoginShape}>
        ورود با رمز یکبار مصرف
      </Link>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.forgotPassword}
        variant="body2"
        color="inherit"
        sx={{ alignSelf: 'center', cursor: 'pointer' }}
      >
        رمز عبور خود را فراموش کرده‌اید؟
      </Link>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {renderForm}
    </FormProvider>
  );
}
