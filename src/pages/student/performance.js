import { Helmet } from 'react-helmet-async';
// sections
import PerformanceView from 'src/student-sections/performance/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Performance </title>
            </Helmet>

            <PageDecorator>
                <PerformanceView />
            </PageDecorator>
        </>
    );
}
