import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import AuthClassicLayout from 'src/layouts/auth/classic';
import CompactLayout from 'src/layouts/compact/layout';
// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const LoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const RegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/jwt/forgot-password'));

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Suspense fallback={<SplashScreen />} />
            <CompactLayout>
              <LoginPage />
            </CompactLayout>
          </GuestGuard>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Suspense fallback={<SplashScreen />} />
            <CompactLayout>
              <RegisterPage />
            </CompactLayout>
          </GuestGuard>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <CompactLayout>
            <ForgotPasswordPage />
          </CompactLayout>
        ),
      },
    ],
  },
];
