import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
// util
import { toFarsiNumber } from 'src/utils/format-number-persian';
import { fPersianDate } from 'src/utils/format-time';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function HomeworkFolder({ homework }) {
  const checkbox = useBoolean();
  const { id, title, subtitle, is_completed, deadline, status } = homework;

  const renderAction = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        position: 'absolute',
      }}
    >
      <Tooltip
        title={
          status === 'finished'
            ? 'مهلت به پایان رسیده'
            : status === 'in-progress'
            ? 'هنوز فرصت هست'
            : 'نزدیک به پایان زمان'
        }
      >
        <Iconify
          icon="solar:clock-circle-line-duotone"
          color={status === 'finished' ? 'inherit' : status === 'in-progress' ? 'info.main' : 'error.main'}
        />
      </Tooltip>
      <Tooltip title={is_completed ? 'تمرین کامل شده' : 'تمرین کامل نشده'}>
        <Checkbox
          color="warning"
          icon={<Iconify icon="eva:star-outline" />}
          checkedIcon={<Iconify icon="eva:star-fill" />}
          checked={is_completed}
        />
      </Tooltip>
    </Stack>
  );

  const renderIcon = <Box component="img" src="/assets/icons/files/ic_folder.svg" sx={{ width: 36, height: 36 }} />;

  const renderText = (
    <>
      <Link component={RouterLink} href={paths.student.homework(id)}>
        <ListItemText
          primary={`تکلیف ${toFarsiNumber(id)}`}
          secondary={
            <>
              {title}
              <Box
                component="span"
                sx={{ mx: 0.75, width: 2, height: 2, borderRadius: '50%', bgcolor: 'currentColor' }}
              />
              {subtitle}
            </>
          }
          primaryTypographyProps={{
            noWrap: true,
            typography: 'subtitle1',
            color: 'text.primary',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
            display: 'inline-flex',
          }}
        />
      </Link>
      <Typography variant="caption" color="text.disabled">
        مهلت انجام: &nbsp; {fPersianDate(deadline)}
      </Typography>
    </>
  );

  return (
    <Stack
      component={Card}
      spacing={1}
      alignItems="flex-start"
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        cursor: 'pointer',
        position: 'relative',
        backdropFilter: `blur(8px)`,
        WebkitBackdropFilter: `blur(8px)`,
        bgcolor: 'unset',
        boxShadow: (theme) => theme.customShadows.z20,
      }}
    >
      <Box onMouseEnter={checkbox.onTrue} onMouseLeave={checkbox.onFalse}>
        {renderIcon}
      </Box>

      {renderAction}

      {renderText}
    </Stack>
  );
}

HomeworkFolder.propTypes = {
  homework: PropTypes.object,
};
