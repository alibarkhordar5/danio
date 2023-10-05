import { useSettingsContext } from 'src/components/settings/context';
// @mui
import { Container, Typography } from '@mui/material';

export default function CourseReview() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mt: { xs: 3, md: 6 },
          mb: { xs: 3, md: 4 },
        }}
      >
        مرور درس
      </Typography>
    </Container>
  );
}
