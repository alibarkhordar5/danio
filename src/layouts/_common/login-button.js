import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function LoginButton({ sx }) {
  return (
    <Button component={RouterLink} href={paths.auth.jwt.login} variant="outlined" sx={{ mr: 1, ...sx }}>
      ورود
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
