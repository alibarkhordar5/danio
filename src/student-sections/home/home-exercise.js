import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// util
import { toFarsiNumber } from 'src/utils/format-number-persian';

// ----------------------------------------------------------------------

const DATA = [
  {
    title: 'اعداد',
    subtitle: 'اعداد اعشاری',
    levelDescription: 'مبتدی',
    levelColor: 'warning',
    score: 95,
  },
  {
    title: 'اعداد',
    subtitle: 'اعداد حقیقی',
    levelDescription: 'پیشرفته',
    levelColor: 'success',
    score: 70,
  },
  {
    title: 'تقارن',
    subtitle: 'مختصات',
    levelDescription: 'متوسط',
    levelColor: 'info',
    score: 50,
  },
  {
    title: 'هندسه',
    subtitle: 'مثلث',
    levelDescription: 'پیشرفته',
    levelColor: 'success',
    score: 20,
  },
];

// ----------------------------------------------------------------------

function ExerciseItem({ item }) {
  return (
    <Button fullWidth sx={{ py: 1 }} component={RouterLink} href={paths.student.exercise}>
      <Stack sx={{ width: '100%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Stack direction="column" spacing={1}>
            <Typography variant="subtitle1">{item.title}</Typography>
            <Typography variant="caption">{item.subtitle}</Typography>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Label color={item.levelColor} sx={{ width: '50px' }}>
              {item.levelDescription}
            </Label>
            <Typography variant="caption" sx={{ display: 'flex', justifyContent: 'end' }}>
              {toFarsiNumber(item.score)}%
            </Typography>
          </Stack>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={item.score}
          color={(item.score < 30 && 'error') || (item.score < 60 && 'warning') || 'success'}
          sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
        />
      </Stack>
    </Button>
  );
}

export default function HomeExercise() {
  return (
    <Card>
      <CardHeader
        title={'تمرین‌های پیشنهادی'}
        action={
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-back-fill" width={18} sx={{ ml: -0.5 }} />}
            component={RouterLink}
            href={paths.student.course}
          >
            همه
          </Button>
        }
      />
      <Stack spacing={3} sx={{ p: 3 }}>
        {DATA.map((item, index) => (
          <ExerciseItem key={index} item={item} />
        ))}
      </Stack>
    </Card>
  );
}

HomeExercise.propTypes = {
  data: PropTypes.array,
};
