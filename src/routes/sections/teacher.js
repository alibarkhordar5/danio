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

const IndexPage = lazy(() => import('src/pages/teacher/home'));
const PageClass = lazy(() => import('src/pages/teacher/class'));
const PageClasses = lazy(() => import('src/pages/teacher/classes'));
const PageCourse = lazy(() => import('src/pages/teacher/course'));
const PageGuide = lazy(() => import('src/pages/teacher/guide'));
const PageProfile = lazy(() => import('src/pages/teacher/profile'));
const PageStudent = lazy(() => import('src/pages/teacher/student'));
const PageStudents = lazy(() => import('src/pages/teacher/students'));
const PageQuestion = lazy(() => import('src/pages/teacher/question'));
const PageHomework = lazy(() => import('src/pages/teacher/homework'));
const PageStudentHomework = lazy(() => import('src/pages/teacher/studentHomework'));
const PageSkills = lazy(() => import('src/pages/teacher/skills'));
const PageNeTest = lazy(() => import('src/pages/teacher/neTest'));

// ----------------------------------------------------------------------

export const teacherRoutes = [
    {
        path: 'teacher',
        element: (
            <AuthGuard role={ROLES.teacher}>
                <DashboardLayout>
                    <Suspense fallback={<LoadingScreen />}>
                        <Outlet />
                    </Suspense>
                </DashboardLayout>
            </AuthGuard>
        ),
        children: [
            { element: <IndexPage />, index: true },
            { path: 'class/:id', element: <PageClass /> },
            { path: 'classes', element: <PageClasses /> },
            // { path: 'course/:id', element: <PageCourse /> },
            { path: 'homework/:id', element: <PageHomework /> },
            { path: 'guide', element: <PageGuide /> },
            { path: 'profile', element: <PageProfile /> },
            { path: 'student/:id', element: <PageStudent /> },
            { path: 'students', element: <PageStudents /> },
            { path: 'question', element: <PageQuestion /> },
            {
                path: 'skill',
                children: [{ path: 'question/:questionKey', element: <PageQuestion IsHomeWork={false} /> }],
            },
            { path: 'homework/:homeworkId/student/:studentId', element: <PageStudentHomework /> },
            { path: 'skills', element: <PageSkills /> },
            { path: 'ne-test', element: <PageNeTest /> },
        ],
    },
];
