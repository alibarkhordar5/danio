import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { usePathname, useRouter } from 'src/routes/hook';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths = {
    jwt: paths.auth.jwt.login,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ role, children }) {
    const router = useRouter();
    const { authenticated, method, user } = useAuthContext();

    const hasAccess = user?.role === role;

    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!authenticated || !hasAccess) {
            const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString();

            const loginPath = loginPaths[method];

            const href = `${loginPath}?${searchParams}`;

            router.replace(href);
        } else {
            setChecked(true);
        }
    }, [authenticated, method, router]);

    useEffect(() => {
        check();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!checked) {
        return null;
    }

    return <>{children}</>;
}

AuthGuard.propTypes = {
    children: PropTypes.node,
};
