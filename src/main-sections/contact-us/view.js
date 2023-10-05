import { m, useScroll } from 'framer-motion';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// neshan
import '@neshan-maps-platform/react-openlayers/dist/style.css';

import NeshanMap from '@neshan-maps-platform/react-openlayers';
// components
import ScrollProgress from 'src/components/scroll-progress';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { MotionViewport, varFade } from 'src/components/animate';
//
import Hero from '../components/hero';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  const ContactUsSchema = Yup.object().shape({
    name: Yup.string().required('لطفاً نام و نام خانوادگی خود را وارد نمایید.'),
    phone_number: Yup.string()
      .required('لطفاً شماره تماس خود را وارد نمایید.')
      .matches(
        /^(((09)(\d){9})|((\u0660\u0669)[\u0660-\u0669]{9})|((\u06F0\u06F9)[\u06F0-\u06F9]{9}))$/,
        'مثال ۰۹۱۲۳۴۵۶۷۸۹'
      )
      .required('لطفاً شماره همراه خود را وارد کنید.')
      .typeError('لطفاً شماره همراه خود را وارد کنید.'),
    subject: Yup.string().required('لطفاً عنوان پیام خود را وارد نمایید.'),
    message: Yup.string().min(10, 'لطفاً حداقل ۱۰ کاراکتر بنویسید.').required('متن'),
  });

  const defaultValues = {
    name: '',
    phone_number: '',
    subject: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(ContactUsSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(data);
    } catch (error) {
      reset();
    }
  });

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Hero title="دانیو" subtitle={['گامی', 'به‌سوی', 'عدالت آموزشی']} />

      <Box
        component={MotionViewport}
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container sx={{ py: { xs: 10, md: 15 } }}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h4">لطفا نظرات خود را با ما به اشتراک بگذارید.</Typography>
          </m.div>

          <Grid container spacing={4} sx={{ my: { xs: 4, md: 8 } }}>
            <Grid item xs={12} md={6}>
              <FormProvider methods={methods} onSubmit={onSubmit}>
                <Stack spacing={3}>
                  <m.div variants={varFade().inUp}>
                    <RHFTextField name="name" label="نام " />
                  </m.div>
                  <m.div variants={varFade().inUp}>
                    <RHFTextField name="phone_number" label="شماره همراه" />
                  </m.div>
                  <m.div variants={varFade().inUp}>
                    <RHFTextField name="subject" label="عنوان" />
                  </m.div>
                  <m.div variants={varFade().inUp}>
                    <RHFTextField multiline name="message" label="پیام" minRows={4} />
                  </m.div>
                  <LoadingButton color="primary" size="large" type="submit" variant="contained" loading={isSubmitting}>
                    ارسال
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ borderRadius: 2, border: `1px solid`, height: 1 }}>
                <NeshanMap mapKey="YOUR_MAP_KEY"></NeshanMap>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
