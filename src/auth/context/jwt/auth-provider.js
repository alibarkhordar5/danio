import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
    user: null,
    loading: true,
};

const reducer = (state, action) => {
    if (action.type === 'INITIAL') {
        const data = action.payload;
        if (data.classes && data.user) {
            return {
                loading: false,
                user: {
                    class: { ...data?.classes[0] },
                    first_name: data.user.first_name,
                    gender: data.user.gender,
                    grade: data.user.grade,
                    id: data.user.id,
                    last_name: data.user.last_name,
                    profile_url: data.user.profile_url,
                    role: data.user.role,
                    username: data.user.username,
                },
            };
        } else {
            return {
                loading: false,
                user: null,
            };
        }
    }
    if (action.type === 'LOGIN') {
        return {
            ...state,
            user: {
                ...action.payload.user,
                class: { ...action.payload?.user_class },
                grade: action.payload?.user_class?.grade,
            },
        };
    }
    if (action.type === 'REGISTER') {
        return {
            ...state,
            user: action.payload.user,
        };
    }
    if (action.type === 'LOGOUT') {
        return {
            ...state,
            user: null,
        };
    }
    return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const initialize = useCallback(async () => {
        try {
            const accessToken = localStorage.getItem(STORAGE_KEY);

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);

                const response = await axios.get(endpoints.profile.profile);

                const { user, classes } = response.data;

                dispatch({
                    type: 'INITIAL',
                    payload: {
                        user,
                        classes,
                    },
                });
            } else {
                dispatch({
                    type: 'INITIAL',
                    payload: {
                        user: null,
                    },
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'INITIAL',
                payload: {
                    user: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    // LOGIN
    const login = useCallback(async (username, password) => {
        const data = {
            username,
            password,
        };

        const response = await axios.post(endpoints.auth.login, data);
        const { access, class: user_class, user } = response.data;

        setSession(access);

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
                user_class,
            },
        });
    }, []);

    const setLoginInfo = useCallback(async (response) => {
        const { access, user } = response.data;

        setSession(access);

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        });
    }, []);

    // REGISTER
    const register = useCallback(async (data) => {
        const response = await axios.post(endpoints.auth.register, data);

        const { accessToken, user } = response.data;

        localStorage.setItem(STORAGE_KEY, accessToken);

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        });
    }, []);

    // LOGOUT
    const logout = useCallback(async () => {
        setSession(null);
        dispatch({
            type: 'LOGOUT',
        });
    }, []);

    // ----------------------------------------------------------------------

    const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

    const status = state.loading ? 'loading' : checkAuthenticated;

    const memoizedValue = useMemo(
        () => ({
            user: state.user,
            method: 'jwt',
            loading: status === 'loading',
            authenticated: status === 'authenticated',
            unauthenticated: status === 'unauthenticated',
            //
            update: initialize,
            login,
            setLoginInfo,
            register,
            logout,
        }),
        [login, setLoginInfo, logout, register, state.user, status]
    );

    return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node,
};
