// ----------------------------------------------------------------------

const ROOTS = {
    AUTH: '/auth',
    DASHBOARD: '/dashboard',
    STUDENT: '/student',
    TEACHER: '/teacher',
    INTRODUCTION: '/introduction',
};

// ----------------------------------------------------------------------

export const paths = {
    minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
    about: '/about-us',
    contact: '/contact-us',
    page404: '/404',
    introduction: {
        root: ROOTS.INTRODUCTION,
        students: `${ROOTS.INTRODUCTION}/for-students`,
        teachers: `${ROOTS.INTRODUCTION}/for-teachers`,
        schools: `${ROOTS.INTRODUCTION}/for-schools`,
    },
    // AUTH
    auth: {
        jwt: {
            login: `${ROOTS.AUTH}/login`,
            register: `${ROOTS.AUTH}/register`,
            forgotPassword: `${ROOTS.AUTH}/forgot-password`,
        },
    },
    // DASHBOARD
    dashboard: {
        root: ROOTS.DASHBOARD,
        one: `${ROOTS.DASHBOARD}/one`,
        two: `${ROOTS.DASHBOARD}/two`,
        three: `${ROOTS.DASHBOARD}/three`,
        group: {
            root: `${ROOTS.DASHBOARD}/group`,
            five: `${ROOTS.DASHBOARD}/group/five`,
            six: `${ROOTS.DASHBOARD}/group/six`,
        },
    },
    // STUDENT
    student: {
        root: ROOTS.STUDENT,
        course: `${ROOTS.STUDENT}/course`,
        courseReview: `${ROOTS.STUDENT}/course-review`,
        homeworks: `${ROOTS.STUDENT}/homeworks`,
        homework: (id) => `${ROOTS.STUDENT}/homeworks/homework/${id}`,
        exercise: `${ROOTS.STUDENT}/exercise`,
        performance: `${ROOTS.STUDENT}/performance`,
        profile: `${ROOTS.STUDENT}/profile`,
        guide: `${ROOTS.STUDENT}/guide`,
        payment: `${ROOTS.STUDENT}/payment`,
        // question: (key) => `${ROOTS.STUDENT}/question/${key}`,
        skillQuestion: (key) => `${ROOTS.STUDENT}/skill/question/${key}`,
        homeWorkQuestion: (Qkey, Hkey) => `${ROOTS.STUDENT}/homework/${Hkey}/question/${Qkey}`,
    },
    // TEACHER
    teacher: {
        root: ROOTS.TEACHER,
        class: (id) => `${ROOTS.TEACHER}/class/${id}`,
        classes: `${ROOTS.TEACHER}/classes`,
        homework: (id) => `${ROOTS.TEACHER}/homework/${id}`,
        studentHomework: (homeworkId, studentId) => `${ROOTS.TEACHER}/homework/${homeworkId}/student/${studentId}`,
        course: (id) => `${ROOTS.TEACHER}/course/${id}`,
        profile: `${ROOTS.TEACHER}/profile`,
        student: (id) => `${ROOTS.TEACHER}/student/${id}`,
        students: `${ROOTS.TEACHER}/students`,
        guide: `${ROOTS.TEACHER}/guide`,
        skillQuestion: (key) => `${ROOTS.TEACHER}/skill/question/${key}`,
        skills: `${ROOTS.TEACHER}/skills`,
        neTest: `${ROOTS.TEACHER}/ne-test`,
    },
};
