import { Helmet } from 'react-helmet-async';
// sections
import Home from 'src/main-sections/home/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>

      <Home />
    </>
  );
}
