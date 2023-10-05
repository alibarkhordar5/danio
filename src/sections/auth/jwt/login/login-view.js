import { useState } from 'react';
// @mui
import Grid from '@mui/material/Grid';
// components
import UserPassLogin from './user-pass-login';
import OTPLogin from './otp-login';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';

// ----------------------------------------------------------------------

export default function LoginView() {
  const [loginShape, setLoginShape] = useState('user-pass');

  const toggleLoginShape = () => {
    if (loginShape === 'user-pass') setLoginShape('OTP');
    else setLoginShape('user-pass');
  };

  return (
    <Grid container spacing={8} sx={{ justifyContent: 'center' }} alignItems="center">
      <Grid item xs={12} md={6} sx={{ pt: 0 }}>
        {loginShape === 'user-pass' ? (
          <UserPassLogin toggleLoginShape={toggleLoginShape} />
        ) : (
          <OTPLogin toggleLoginShape={toggleLoginShape} />
        )}
      </Grid>
      <Grid item xs={9} md={6} sx={{ pt: 0 }}>
        <SeoIllustration />
      </Grid>
    </Grid>
  );
}
