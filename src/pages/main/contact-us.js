import { Helmet } from 'react-helmet-async';
// sections
import ContactUs from 'src/main-sections/contact-us/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Contact Us </title>
      </Helmet>

      <ContactUs />
    </>
  );
}
