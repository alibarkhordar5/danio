import { Helmet } from 'react-helmet-async';
// sections
import GuideView from 'src/teacher-sections/guide/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Guide </title>
            </Helmet>

            <PageDecorator>
                <GuideView />
            </PageDecorator>
        </>
    );
}
