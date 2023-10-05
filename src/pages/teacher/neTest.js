import { Helmet } from 'react-helmet-async';
// sections
import NeTest from 'src/teacher-sections/ne-test/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> NE Test </title>
            </Helmet>

            <PageDecorator>
                <NeTest />
            </PageDecorator>
        </>
    );
}
