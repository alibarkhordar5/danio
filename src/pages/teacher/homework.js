import { Helmet } from 'react-helmet-async';
// sections
import HomeworkView from 'src/teacher-sections/homework/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Homework </title>
            </Helmet>

            <PageDecorator>
                <HomeworkView />
            </PageDecorator>
        </>
    );
}
