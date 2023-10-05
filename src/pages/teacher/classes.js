import { Helmet } from 'react-helmet-async';
// sections
import ClassesView from 'src/teacher-sections/classes/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Classes </title>
            </Helmet>

            <PageDecorator>
                <ClassesView />
            </PageDecorator>
        </>
    );
}
