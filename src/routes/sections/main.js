import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main/layout';
// components
import { SplashScreen } from 'src/components/loading-screen';
import CompactLayout from 'src/layouts/compact/layout';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/main/home'));
const PageAboutUs = lazy(() => import('src/pages/main/about-us'));
const PageContactUs = lazy(() => import('src/pages/main/contact-us'));
const PageIntroStudents = lazy(() => import('src/pages/main/introduction/students'));
const PageIntroTeachers = lazy(() => import('src/pages/main/introduction/teachers'));
const PageIntroSchools = lazy(() => import('src/pages/main/introduction/schools'));
const Page404 = lazy(() => import('src/pages/404'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { element: <HomePage />, index: true },
      { path: 'about-us', element: <PageAboutUs /> },
      { path: 'contact-us', element: <PageContactUs /> },
      {
        path: 'introduction',
        children: [
          { element: <PageAboutUs />, index: true },
          { path: 'for-students', element: <PageIntroStudents /> },
          { path: 'for-teachers', element: <PageIntroTeachers /> },
          { path: 'for-schools', element: <PageIntroSchools /> },
        ],
      },
    ],
  },
  {
    element: (
      <CompactLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [{ path: '404', element: <Page404 /> }],
  },
];
