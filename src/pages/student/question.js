import { Helmet } from 'react-helmet-async';
// sections
import QuestionView from 'src/student-sections/question/view';

import Keyboard from 'src/components/question-modules/keyboard/component';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page({ IsHomeWork }) {
    return (
        <>
            <Helmet>
                <title> Question </title>
            </Helmet>

            <PageDecorator>
                <QuestionView IsHomeWork={IsHomeWork} />
                {/* <Keyboard showKeyboard={true} /> */}
            </PageDecorator>
        </>
    );
}
