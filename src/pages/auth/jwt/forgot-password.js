import { Helmet } from 'react-helmet-async';
// sections
import { ForgotPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Forgot Password</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
