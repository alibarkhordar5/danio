import { Helmet } from 'react-helmet-async';
// sections
import ClassView from 'src/teacher-sections/class/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Class </title>
            </Helmet>

            <PageDecorator>
                <ClassView />
            </PageDecorator>
        </>
    );
}
