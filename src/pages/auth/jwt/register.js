import { Helmet } from 'react-helmet-async';
// sections
import { RegisterView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register</title>
      </Helmet>

      <RegisterView />
    </>
  );
}
