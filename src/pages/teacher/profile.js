import { Helmet } from 'react-helmet-async';
// sections
import ProfileView from 'src/teacher-sections/profile/view';
import PageDecorator from '../page-decorator';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Profile </title>
            </Helmet>

            <PageDecorator>
                <ProfileView />
            </PageDecorator>
        </>
    );
}
