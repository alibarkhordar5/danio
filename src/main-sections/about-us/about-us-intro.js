import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// hooks
import { useResponsive } from 'src/hooks/use-responsive';

// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function AboutUsIntro() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.24)}`;

  return (
    <Container
      component={MotionViewport}
      sx={{
        textAlign: { xs: 'center', md: 'unset' },
      }}
    >
      <Grid container columnSpacing={{ md: 3 }} alignItems="flex-start">
        {mdUp && (
          <Grid container xs={12} md={6} lg={7} alignItems="center" sx={{ pr: { md: 7 } }}>
            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="student"
                  src="/assets/images/about/what_2.png"
                  ratio="1/1"
                  sx={{ borderRadius: 3, boxShadow: shadow }}
                />
              </m.div>
            </Grid>

            <Grid xs={6}>
              <m.div variants={varFade().inUp}>
                <Image
                  alt="student"
                  src="/assets/images/about/what_1.png"
                  ratio="3/4"
                  sx={{ borderRadius: 3, boxShadow: shadow }}
                />
              </m.div>
            </Grid>
          </Grid>
        )}

        <Grid xs={12} md={6} lg={5}>
          <m.div variants={varFade().inRight}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              دانیو چیست؟
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                textAlign: 'justify',
                lineHeight: 2,
              }}
            >
              دانیو جایگزینی هوشمند برای تکالیف شماست! در دانیو هر دانش آموز می تواند با توجه به استعدادها و نیازهای
              خود تمرین حل کند و ایرادات خود را پیدا کند. همچنن معلمین می توانند به دانش آموزان خود تکلیف بدهند و وضعیت
              پیشرفت و نقاط قوت و ضعف آنها را لحظه به لحظه رصد کنند. همچنین سوالات متنوع، تعاملی و جذاب دانیو تمرین حل
              کردن را برای دانش آموزان شرین تر از قبل می سازد.
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<Iconify icon="entypo:phone" />}
              sx={{ mt: 4 }}
            >
              تماس با ما
            </Button>
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
