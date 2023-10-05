import { Helmet } from 'react-helmet-async';
// sections
import Home from 'src/student-sections/home/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Home </title>
            </Helmet>

            <PageDecorator>
                <Home />
            </PageDecorator>
        </>
    );
}
