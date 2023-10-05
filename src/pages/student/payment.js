import { Helmet } from 'react-helmet-async';
// sections
import PaymentView from 'src/student-sections/payment/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Payment </title>
            </Helmet>

            <PageDecorator>
                <PaymentView />
            </PageDecorator>
        </>
    );
}
