import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
// utils
import axios, { endpoints } from 'src/utils/axios';
import { fFaToEnNumber } from 'src/utils/format-number-persian';
import { fAvatarUrl } from 'src/utils/format-avatar-url';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import RenderVerifyCode from './verify-code';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

function RenderForm({ onfulfilled, onError }) {
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(
        /^(((09)(\d){9})|((\u0660\u0669)[\u0660-\u0669]{9})|((\u06F0\u06F9)[\u06F0-\u06F9]{9}))$/,
        'مثال ۰۹۱۲۳۴۵۶۷۸۹'
      )
      .required('لطفاً شماره همراه خود را وارد کنید.')
      .typeError('لطفاً شماره همراه خود را وارد کنید.'),
  });

  const defaultValues = {
    phone: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios
        .get(`${endpoints.auth.create_verification_code}?phone=${fFaToEnNumber(data.phone)}`)
        .then((response) => {
          if (response.data?.status === 1) {
            enqueueSnackbar('کد تایید با موفقیت ارسال شد.', { variant: 'success' });
            onfulfilled(data);
          } else onError(response.data?.message || 'خطا در ارسال کد تایید');
        })
        .catch((error) => onError(typeof error === 'string' ? error : error.message || error.detail || 'خطا در ارسال'));
    } catch (error) {
      onError(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField name="phone" label="شماره تلفن همراه" />

        <LoadingButton fullWidth color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
          دریافت کد یکبار مصرف
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

function RenderChooseUser({ users, onSelectUser }) {
  const theme = useTheme();
  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        کاربر مورد نظر خود را انتخاب کنید.
      </Typography>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
        {users.map((user, index) => (
          <Grid item xs={6} sm={4} md={4}>
            <Paper
              sx={{
                borderRadius: 2,
                cursor: 'pointer',
                position: 'relative',
                p: theme.spacing(2, 4),
                '&:hover': {
                  boxShadow: (theme) => theme.customShadows.z12,
                },
                boxShadow: (theme) => theme.customShadows.z4,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                ...bgGradient({
                  direction: '135deg',
                  startColor: alpha(theme.palette.grey[0], 0.16),
                  endColor: alpha(theme.palette.grey[0], 0.2),
                }),
              }}
              onClick={() => onSelectUser(user.username)}
            >
              <Stack spacing={1} alignItems="center" justifyContent="center">
                <Avatar
                  src={fAvatarUrl(user)}
                  alt={user?.last_name}
                  sx={{
                    width: 60,
                    height: 60,
                    border: (theme) => `solid 2px ${theme.palette.background.default}`,
                  }}
                />
                <Typography variant="body1">{user.username}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default function OTPLogin({ toggleLoginShape }) {
  const { setLoginInfo } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const [errorMsg, setErrorMsg] = useState('');

  const [phone, setPhone] = useState('');

  const [code, setCode] = useState('');
  const [codeHasSent, setCodeHasSent] = useState(false);

  const [isMultipleUsers, setIsMultipleUsers] = useState(false);
  const [users, setUsers] = useState([]);

  const onSubmitPhone = async (data) => {
    setCodeHasSent(true);
    setPhone(fFaToEnNumber(data.phone));
  };

  const onSubmitCode = async (code) => {
    try {
      await axios
        .post(endpoints.auth.login, { phone: phone, code: code })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setIsMultipleUsers(true);
            setCode(code);
            setUsers(response.data);
          } else setLoginInfo(response);
        })
        .catch((error) =>
          setErrorMsg(typeof error === 'string' ? error : error.message || error.detail || 'خطا در ارسال')
        );
    } catch (error) {
      setErrorMsg(error);
    }
  };

  const onSelectUser = async (username) => {
    try {
      await axios
        .post(endpoints.auth.login, { phone: phone, code: code, username: username })
        .then((response) => {
          setLoginInfo(response);
        })
        .catch((error) =>
          enqueueSnackbar(typeof error === 'string' ? error : error.message || error.detail || 'خطا در ارسال', {
            variant: 'error',
          })
        );
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message || 'خطا در ارسال');
    }
  };

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

      {!codeHasSent && (
        <RenderForm
          onfulfilled={onSubmitPhone}
          onError={(error) => setErrorMsg(typeof error === 'string' ? error : error.message || 'خطا در ارسال')}
        />
      )}

      {codeHasSent && <RenderVerifyCode onSubmitCode={onSubmitCode} />}

      <Link variant="body2" color="inherit" sx={{ cursor: 'pointer' }} onClick={toggleLoginShape}>
        ورود با اطلاعات کاربری
      </Link>
    </Stack>
  );

  return (
    <Box>
      {codeHasSent && isMultipleUsers ? (
        <RenderChooseUser users={users} onSelectUser={onSelectUser} />
      ) : (
        <>
          {renderHead}
          {renderForm}
        </>
      )}
    </Box>
  );
}
