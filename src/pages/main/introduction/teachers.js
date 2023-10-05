import { Helmet } from 'react-helmet-async';
// sections
import TeacherIntroduction from 'src/main-sections/introduction/teachers/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> For Teachers </title>
      </Helmet>

      <TeacherIntroduction />
    </>
  );
}
