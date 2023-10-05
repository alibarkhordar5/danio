import { Helmet } from 'react-helmet-async';
// sections
import StudentsView from 'src/teacher-sections/students/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Students </title>
            </Helmet>

            <PageDecorator>
                <StudentsView />
            </PageDecorator>
        </>
    );
}
