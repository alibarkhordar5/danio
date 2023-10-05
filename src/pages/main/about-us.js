import { Helmet } from 'react-helmet-async';
// sections
import AboutUs from 'src/main-sections/about-us/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> About Us </title>
      </Helmet>

      <AboutUs />
    </>
  );
}
