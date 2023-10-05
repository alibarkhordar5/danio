import { Helmet } from 'react-helmet-async';
// sections
import StudentIntroduction from 'src/main-sections/introduction/students/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> For Student </title>
      </Helmet>

      <StudentIntroduction />
    </>
  );
}
