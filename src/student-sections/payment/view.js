import { useSettingsContext } from 'src/components/settings/context';
// @mui
import { Container, Typography } from '@mui/material';
import PaymentTable from './payment-table';

export default function GuideView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mt: 2,
          mb: 4,
        }}
      >
        پرداخت‌های من
      </Typography>

      <PaymentTable />
    </Container>
  );
}
