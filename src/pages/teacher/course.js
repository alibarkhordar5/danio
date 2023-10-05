import { Helmet } from 'react-helmet-async';
// sections
import CourseView from 'src/teacher-sections/course/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Course </title>
            </Helmet>

            <PageDecorator>
                <CourseView />
            </PageDecorator>
        </>
    );
}
