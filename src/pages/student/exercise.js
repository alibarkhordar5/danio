import { Helmet } from 'react-helmet-async';
// sections
import ExerciseView from 'src/student-sections/exercise/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Exercise </title>
            </Helmet>

            <PageDecorator>
                <ExerciseView />
            </PageDecorator>
        </>
    );
}
