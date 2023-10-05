import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
//
import Iconify from 'src/components/iconify';
import { toFarsiNumber } from 'src/utils/format-number-persian';

// ----------------------------------------------------------------------

const DATA = [
  {
    title: 'درصد پیشرفت',
    score: 20,
    description: 'میزان پیشرفت در تمرین',
  },
  {
    title: 'درصد درست',
    score: 70,
    description: 'نسبت تعداد سؤالاتی که درست جواب دادی به کل سؤالات',
  },
  {
    title: 'درصد نادرست',
    score: 30,
    description: 'نسبت تعداد سؤالاتی که نادرست جواب دادی به کل سؤالات',
  },
];

// ----------------------------------------------------------------------

function AnalyticsItem({ item }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={1.5}>
      <Tooltip title={item.description}>
        <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">{item.title}</Typography>
          <Typography variant="body2">{toFarsiNumber(item.score)}٪</Typography>
        </Stack>
      </Tooltip>

      <LinearProgress
        variant="determinate"
        value={item.score}
        color={(item.score < 30 && 'error') || (item.score < 60 && 'warning') || 'success'}
        sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
      />
    </Stack>
  );
}

export default function HomeworkAnalytics() {
  return (
    <Card>
      <CardHeader
        title={'عملکرد من'}
        // action={<Iconify icon="solar:info-circle-line-duotone" />}
        sx={{
          '& .MuiCardHeader-action': {
            display: 'flex',
            margin: 'auto',
          },
        }}
      />
      <CardContent>
        <Stack spacing={3}>
          {DATA.map((item, index) => (
            <AnalyticsItem key={index} item={item} />
          ))}
        </Stack>
        <Divider sx={{ py: 2, mx: -3, borderStyle: 'dashed' }} />
        <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="body2">مدت زمان صرف شده</Typography>
          <Stack direction="row" spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2">۰۱:۳۴:۵۴</Typography>
            <Iconify icon="solar:clock-circle-line-duotone" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

HomeworkAnalytics.propTypes = {
  data: PropTypes.array,
};
