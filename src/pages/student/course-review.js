import { Helmet } from 'react-helmet-async';
// sections
import CourseReview from 'src/student-sections/course-review/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> CourseReview </title>
            </Helmet>

            <PageDecorator>
                <CourseReview />
            </PageDecorator>
        </>
    );
}
