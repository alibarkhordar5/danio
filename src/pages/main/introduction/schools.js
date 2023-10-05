import { Helmet } from 'react-helmet-async';
// sections
import SchoolIntroduction from 'src/main-sections/introduction/schools/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> For School & Organization </title>
      </Helmet>

      <SchoolIntroduction />
    </>
  );
}
