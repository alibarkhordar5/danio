// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function ExerciseView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          my: 2,
        }}
      >
        تمارین پیشنهادی
      </Typography>
    </Container>
  );
}
