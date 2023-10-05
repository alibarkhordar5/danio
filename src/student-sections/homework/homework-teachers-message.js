import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function TeachersMessage({ message, img, ...other }) {
  const theme = useTheme();

  return (
    <Stack
      flexDirection="column"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: theme.palette.primary.main,
          endColor: theme.palette.primary.dark,
        }),

        p: { xs: 4, md: 4 },
        borderRadius: 2,
        position: 'relative',
        color: 'common.white',
      }}
      {...other}
    >
      <Typography variant="h4">پیام معلم</Typography>
      {img && (
        <Stack
          component="span"
          justifyContent="center"
          sx={{
            p: { xs: 6, md: 4 },
            maxWidth: 360,
            mx: 'auto',
          }}
        >
          {img}
        </Stack>
      )}
      <Typography>{message}</Typography>
    </Stack>
  );
}

TeachersMessage.propTypes = {
  img: PropTypes.node,
  message: PropTypes.string,
};
