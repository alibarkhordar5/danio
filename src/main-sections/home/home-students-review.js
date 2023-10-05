import { m } from 'framer-motion';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
// components
import { MotionViewport, varFade, varSlide } from 'src/components/animate';
import HomeStatistics from './home-statistics';

// -------------------------------------------------------------------------------------------

const REVIEWS = [
  {
    name: 'تست',
    grade: 'کلاس تست',
    profile_url: '/assets/images/avatar/avatar_5.jpg',
    comment: 'سلام. خیلی ممنون از سایت‌تون. سوالات عالی هستند.',
    color: 'success',
  },
  {
    name: 'تست',
    grade: 'کلاس تست',
    profile_url: '/assets/images/avatar/avatar_1.jpg',
    comment: 'سلام. خیلی ممنون از سایت‌تون. سوالات عالی هستند.',
    color: 'warning',
  },
  {
    name: 'تست',
    grade: 'کلاس تست',
    profile_url: '/assets/images/avatar/avatar_5.jpg',
    comment: 'سلام. خیلی ممنون از سایت‌تون. سوالات عالی هستند.',
    color: 'error',
  },
];

// -------------------------------------------------------------------------------------------

export default function HomeStudentReview() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        position: 'relative',
        bgcolor: alpha(theme.palette.background.default, 0.4),
      }}
    >
      <Container component={MotionViewport}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5} sx={{ display: 'flex', alignItems: 'center' }}>
            <m.div variants={varFade().inUp} style={{ width: '100%' }}>
              <Stack sx={{ width: 1 }} spacing={6}>
                <Typography variant="h3" sx={{ textAlign: 'center' }}>
                  نظرات دانش‌آموزان
                </Typography>
                <HomeStatistics />
              </Stack>
            </m.div>
          </Grid>
          <Grid item xs={12} lg={7}>
            <Stack alignItems="center" justifyContent="center" spacing={3} sx={{ width: '100%', height: '100%' }}>
              {REVIEWS.map((reviewer, index) => (
                <m.div variants={varSlide().inLeft}>
                  <ReviewItem
                    profile_url={reviewer.profile_url}
                    name={reviewer.name}
                    grade={reviewer.grade}
                    comment={reviewer.comment}
                    color={reviewer.color}
                    sx={{
                      ml: { xs: 0, lg: `${(index % 2) * 60}px` },
                      mr: { xs: 0, lg: `${((index + 1) % 2) * 60}px` },
                      maxWidth: '560px',
                    }}
                  />
                </m.div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// -------------------------------------------------------------------------------------------

function ReviewItem({ profile_url, name, grade, comment, color, sx }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        px: 3,
        py: 2,
        width: '100%',
        background: alpha(theme.palette[color].main, 0.12),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backdropFilter: 'blur(4px)',
        ...sx,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Avatar
          src={profile_url || '/assets/images/avatar/avatar_5.jpg'}
          alt={name}
          sx={{
            width: 50,
            height: 50,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />

        <ListItemText
          primary={name}
          secondary={grade}
          primaryTypographyProps={{ typography: 'body' }}
          secondaryTypographyProps={{ typography: 'caption', color: 'text.disabled' }}
        />
      </Stack>

      <Typography variant="body2" sx={{ marginTop: 1, lineHeight: 2 }}>
        {comment}
      </Typography>
    </Card>
  );
}
