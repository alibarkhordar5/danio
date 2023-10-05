import { Helmet } from 'react-helmet-async';
// sections
import Skills from 'src/teacher-sections/skills/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Skills </title>
            </Helmet>

            <PageDecorator>
                <Skills />
            </PageDecorator>
        </>
    );
}
