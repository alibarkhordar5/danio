import { Helmet } from 'react-helmet-async';
// sections
import QuestionView from 'src/student-sections/question/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Question </title>
            </Helmet>

            <PageDecorator>
                <QuestionView />
            </PageDecorator>
        </>
    );
}
