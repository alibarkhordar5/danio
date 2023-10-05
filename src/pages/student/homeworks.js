import { Helmet } from 'react-helmet-async';
// sections
import HomeworksView from 'src/student-sections/homeworks/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Homeworks </title>
            </Helmet>

            <PageDecorator>
                <HomeworksView />
            </PageDecorator>
        </>
    );
}
