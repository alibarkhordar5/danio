// mui
import { useTheme, alpha } from '@mui/material/styles';
import { Paper, Stack, Divider, Typography, Container } from '@mui/material';
// utils
import { toFarsiNumber } from 'src/utils/format-number-persian';
//
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const STATISTICS = [
  {
    id: 1,
    title: 'دانش‌آموزان',
    number: 21000,
  },
  {
    id: 2,
    title: 'معلمان',
    number: 1700,
  },
  {
    id: 3,
    title: 'مدارس',
    number: 350,
  },
  {
    id: 4,
    title: 'سؤالات',
    number: 256000,
  },
];

// ----------------------------------------------------------------------

export default function HomeStatistics2() {
  const theme = useTheme();
  const smDown = useResponsive('down', 'sm');

  return (
    <Paper
      sx={{
        background: alpha(theme.palette.primary.main, 0.86),
        color: 'white',
        overflow: 'unset',
        boxShadow: theme.customShadows.z20,
        borderRadius: 0,
      }}
    >
      <Container>
        <Stack
          direction={smDown ? 'column' : 'row'}
          justifyContent="space-around"
          divider={
            <Divider
              orientation={smDown ? 'horizontal' : 'vertical'}
              flexItem
              sx={{ borderStyle: 'dashed', borderColor: 'white' }}
            />
          }
          sx={{ py: 3, mx: 3 }}
        >
          {STATISTICS.map((s, index) => (
            <StatisticItem data={s} key={index} />
          ))}
        </Stack>
      </Container>
    </Paper>
  );
}

// ----------------------------------------------------------------------

export function StatisticItem({ data }) {
  return (
    <Stack direction="column" sx={{ p: 2, display: 'flex', alignItems: 'center' }} key={data?.id}>
      <Typography variant="h4">{toFarsiNumber(data?.number)}+</Typography>

      <Typography variant="subtitle2">{data?.title}</Typography>
    </Stack>
  );
}
