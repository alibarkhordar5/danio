import { m } from 'framer-motion';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeIntroductionVideo() {
  const theme = useTheme();

  const aspectRatio = 9 / 16;

  const maxWidth = 600;

  const renderVideo = (
    <Box
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        paddingTop: `${aspectRatio * 100}%`,
        border: 0,
        borderRadius: 8,
      }}
    >
      <iframe
        src={'https://www.aparat.com/video/video/embed/videohash/RO6b1/vt/frame'}
        title="Danio"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxWidth * aspectRatio}px`,
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: 'auto',
          border: 0,
          borderRadius: 8,
        }}
      />
    </Box>
  );

  return (
    <Box
      sx={{
        pb: 10,
        position: 'relative',
        bgcolor: alpha(theme.palette.primary.lighter, 0.4),
        '&:before': {
          top: 0,
          left: 0,
          width: 1,
          content: "''",
          position: 'absolute',
          height: { xs: 80, md: 100 },
          bgcolor: 'background.default',
        },
      }}
    >
      <Container component={MotionViewport}>
        <Grid container>
          <Grid item xs={12} md={7}>
            <m.div variants={varFade().inDown}>
              <Box
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  display: 'flex',
                  overflow: 'hidden',
                  position: 'relative',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {renderVideo}
              </Box>
            </m.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <m.div variants={varFade().inUp}>
              <Typography
                variant="subtitle2"
                sx={{ textAlign: 'center', mt: { xs: 0, md: 24 }, mx: { xs: 3, md: 4 }, lineHeight: 2 }}
              >
                دانیو جایگزینی هوشمند برای تکالیف شماست! در دانیو هر دانش آموز می تواند با توجه به استعدادها و نیازهای
                خود تمرین حل کند و ایرادات خود را پیدا کند. همچنن معلمین می توانند به دانش آموزان خود تکلیف بدهند و
                وضعیت پیشرفت و نقاط قوت و ضعف آنها را لحظه به لحظه رصد کنند. همچنین سوالات متنوع، تعاملی و جذاب دانیو
                تمرین حل کردن را برای دانش آموزان شرین تر از قبل می سازد.
              </Typography>
            </m.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
