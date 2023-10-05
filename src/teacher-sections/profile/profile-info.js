import PropTypes from 'prop-types';
import { format } from 'date-fns';
import * as Yup from 'yup';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// utils
import axios, { endpoints } from 'src/utils/axios';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// components
import { useSnackbar } from 'notistack';
import FormProvider, { RHFDatePicker, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ProfileInfo({ profile }) {
  const { enqueueSnackbar } = useSnackbar();

  const UserSchema = Yup.object().shape({
    first_name: Yup.string().required('is required'),
    last_name: Yup.string().required('is required'),
    email: Yup.string().email('لطفا آدرس ایمیل معتبر وارد کنید.'),
    national_code: Yup.string().test('len', 'کد ملی معتبر وارد کنید', (val) => val.length === 10 || val.length === 0),
    phone: Yup.string()
      .matches(
        /^(((09)(\d){9})|((\u0660\u0669)[\u0660-\u0669]{9})|((\u06F0\u06F9)[\u06F0-\u06F9]{9})) || ()$/,
        'مثال ۰۹۱۲۳۴۵۶۷۸۹'
      )
      .typeError('لطفاً شماره همراه خود را وارد کنید.'),
  });

  const defaultValues = useMemo(
    () => ({
      first_name: profile?.user?.first_name || '',
      last_name: profile?.user?.last_name || '',
      school_name: profile?.user?.school_name || '',
      email: profile?.user?.email || '',
      phone: profile?.user?.phone || '',
      province: profile?.personal_info?.province || '',
      city: profile?.personal_info?.city || '',
      address: profile?.personal_info?.address || '',
      postal_code: profile?.personal_info?.postal_code || '',
      national_code: profile?.personal_info?.national_code || '',
      birth_date: profile?.personal_info?.birth_date ? new Date(profile.personal_info.birth_date) : null,
    }),
    [profile]
  );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const values = {};
      for (const [key, value] of Object.entries(data)) {
        if (![null, ''].includes(value)) values[key] = value;
      }
      if (values.birth_date) values.birth_date = format(values.birth_date._d || values.birth_date, 'yyyy-MM-dd');

      await axios.patch(endpoints.profile.updateProfile, values);
      enqueueSnackbar(profile ? 'تغییرات با موفقیت ثبت شد' : 'کاربر با موفقیت ایجاد شد');
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFTextField
            name="first_name"
            label="نام"
            disabled={!profile.is_individual_customer}
            variant={profile.is_individual_customer ? 'outlined' : 'filled'}
          />
          <RHFTextField
            name="last_name"
            label="نام خانوادگی"
            disabled={!profile.is_individual_customer}
            variant={profile.is_individual_customer ? 'outlined' : 'filled'}
          />
          <RHFTextField
            name="national_code"
            label="کد ملی"
            disabled={!profile.is_individual_customer}
            variant={profile.is_individual_customer ? 'outlined' : 'filled'}
          />
          <RHFDatePicker name="birth_date" label="تاریخ تولد" />

          {!profile.is_individual_customer && <RHFTextField name="phone" label="شماره تلفن" />}

          <RHFTextField name="email" label="ایمیل" />
          <RHFTextField
            name="school_name"
            label="نام مدرسه"
            disabled={!profile.is_individual_customer}
            variant={profile.is_individual_customer ? 'outlined' : 'filled'}
          />

          <RHFTextField
            name="province"
            label="استان"
            disabled={!profile.is_individual_customer}
            variant={profile.is_individual_customer ? 'outlined' : 'filled'}
          />
          <RHFTextField
            name="city"
            label="شهر"
            disabled={!profile.is_individual_customer}
            variant={profile.is_individual_customer ? 'outlined' : 'filled'}
          />
          <RHFTextField name="address" label="آدرس" />
          <RHFTextField name="postal_code" label="کد پستی" />
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            ثبت تغییرات
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}

ProfileInfo.propTypes = {
  currentUser: PropTypes.object,
};
