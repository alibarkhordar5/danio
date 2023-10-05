import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';
// config
import { ROLES } from 'src/config-global';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/student/home'));
const PageCourse = lazy(() => import('src/pages/student/course'));
const PageCourseReview = lazy(() => import('src/pages/student/course-review'));
const PageHomeworks = lazy(() => import('src/pages/student/homeworks'));
const PageHomework = lazy(() => import('src/pages/student/homework'));
const PageExercise = lazy(() => import('src/pages/student/exercise'));
const PagePerformance = lazy(() => import('src/pages/student/performance'));
const PageProfile = lazy(() => import('src/pages/student/profile'));
const PageQuestion = lazy(() => import('src/pages/student/question'));
const PageGuide = lazy(() => import('src/pages/student/guide'));
const PagePayment = lazy(() => import('src/pages/student/payment'));

// ----------------------------------------------------------------------

export const studentRoutes = [
    {
        path: 'student',
        element: (
            <AuthGuard role={ROLES.student}>
                <DashboardLayout>
                    <Suspense fallback={<LoadingScreen />}>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            </AuthGuard>
        ),
        children: [
            { element: <IndexPage />, index: true },
            { path: 'course', element: <PageCourse /> },
            { path: 'course-review', element: <PageCourseReview /> },
            {
                path: 'homeworks',
                children: [
                    { element: <PageHomeworks />, index: true },
                    { path: 'homework/:homeworkId', element: <PageHomework IsHomeWork={true} /> },
                ],
            },
            {
                path: 'homework/:homeworkId',
                // element: <PageHomework />,
                children: [{ path: 'question/:questionKey', element: <PageQuestion IsHomeWork={true} /> }],
            },
            { path: 'exercise', element: <PageExercise /> },
            { path: 'performance', element: <PagePerformance /> },
            { path: 'profile', element: <PageProfile /> },
            {
                path: 'skill',
                children: [{ path: 'question/:questionKey', element: <PageQuestion IsHomeWork={false} /> }],
            },
            { path: 'guide', element: <PageGuide /> },
            { path: 'payment', element: <PagePayment /> },
        ],
    },
];
