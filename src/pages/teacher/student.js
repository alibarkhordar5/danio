import { Helmet } from 'react-helmet-async';
// sections
import StudentView from 'src/teacher-sections/student/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Student </title>
            </Helmet>

            <PageDecorator>
                <StudentView />
            </PageDecorator>
        </>
    );
}
