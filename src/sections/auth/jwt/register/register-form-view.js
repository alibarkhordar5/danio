import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// config
import { GENDERS, GRADES } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterFormView({ onSubmitForm }) {
  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required('نام'),
    last_name: Yup.string().required('نام خانوادگی'),
    phone: Yup.string()
      .matches(
        /^(((09)(\d){9})|((\u0660\u0669)[\u0660-\u0669]{9})|((\u06F0\u06F9)[\u06F0-\u06F9]{9}))$/,
        'مثال ۰۹۱۲۳۴۵۶۷۸۹'
      )
      .required('لطفاً شماره همراه خود را وارد کنید.')
      .typeError('لطفاً شماره همراه خود را وارد کنید.')
      .nullable(),
    username: Yup.string().required('نام کاربری'),
    password: Yup.string().required('رمز عبور'),
    gender: Yup.object().required('لطفا جنسیت خود را مشخص کنید.'),
    grade: Yup.object().required('لطفا پایه خود را مشخص کنید.'),
  });

  const defaultValues = {
    first_name: '',
    last_name: '',
    username: '',
    phone: '',
    password: '',
    gender: null,
    grade: null,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isLoading, isSubmitted, isValidating },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    onSubmitForm(data);
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="first_name" label="نام" />
          <RHFTextField name="last_name" label="نام خانوادگی" />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFAutocomplete
            name="grade"
            options={GRADES}
            getOptionLabel={(option) => option['name']}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="پایه"
          />
          <RHFAutocomplete
            name="gender"
            options={GENDERS}
            getOptionLabel={(option) => option['name']}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            label="جنسیت"
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="username" label="نام کاربری" />
          <RHFTextField name="phone" label="شماره تلفن همراه" />
        </Stack>

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

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isLoading}
        >
          ساخت حساب کاربری
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
