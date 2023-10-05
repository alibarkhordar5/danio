import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
// utils
import { toFarsiNumber } from 'src/utils/format-number-persian';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function HomeTopStudents({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ['totalFavorites'], ['desc']).map((student, index) => (
          <StudentItem key={student.id} student={student} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

HomeTopStudents.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function StudentItem({ student, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={student.nickname} src={student.avatar_url} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{student.nickname}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary',
          }}
        >
          <Iconify icon="solar:stars-bold-duotone" width={14} sx={{ mr: 0.5 }} />
          {toFarsiNumber(student.weekly_score)}
        </Typography>
      </Box>

      <Iconify
        icon="solar:cup-star-bold"
        sx={{
          p: 1,
          width: 40,
          height: 40,
          borderRadius: '50%',
          color: 'warning.main',
          bgcolor: (theme) => alpha(theme.palette.warning.main, 0.08),
          ...(index === 1 && {
            color: 'success.main',
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
          }),
          ...(index === 2 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
        }}
      />
    </Stack>
  );
}

StudentItem.propTypes = {
  student: PropTypes.object,
  index: PropTypes.number,
};
