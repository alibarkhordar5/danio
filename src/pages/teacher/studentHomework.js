import { Helmet } from 'react-helmet-async';
// sections
import StudentHomeworkView from 'src/teacher-sections/student-homework/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Student Homework </title>
            </Helmet>

            <PageDecorator>
                <StudentHomeworkView />
            </PageDecorator>
        </>
    );
}
