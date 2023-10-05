import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
// @mui
import Collapse from '@mui/material/Collapse';
// routes
import { usePathname, useRouter } from 'src/routes/hook';
import { useActiveLink } from 'src/routes/hook/use-active-link';
//
import NavItem from './nav-item';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, hasChild, config }) {
    const pathname = usePathname();
    const router = useRouter();

    const active = useActiveLink(data.path, hasChild);

    // const externalLink = data.path.includes('http');

    const [open, setOpen] = useState(active);
    const { logout, user } = useAuthContext();

    useEffect(() => {
        if (!active) {
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const handleToggle = useCallback(async () => {
        if (data.path === '/exit') {
            await logout();
            router.replace('/');
        } else {
            setOpen((prev) => !prev);
        }
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <NavItem
                item={data}
                depth={depth}
                open={open}
                active={active}
                // externalLink={externalLink}
                onClick={handleToggle}
                config={config}
            />

            {hasChild && (
                <Collapse in={open} unmountOnExit>
                    <NavSubList data={data.children} depth={depth} config={config} />
                </Collapse>
            )}
        </>
    );
}

NavList.propTypes = {
    config: PropTypes.object,
    data: PropTypes.object,
    depth: PropTypes.number,
    hasChild: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NavSubList({ data, depth, config }) {
    return (
        <>
            {data.map((list) => {
                return (
                    <NavList
                        key={list.title + list.path}
                        data={list}
                        depth={depth + 1}
                        hasChild={!!list.children}
                        config={config}
                    />
                );
            })}
        </>
    );
}

NavSubList.propTypes = {
    config: PropTypes.object,
    data: PropTypes.array,
    depth: PropTypes.number,
};
