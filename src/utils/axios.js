import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
    chat: '/api/chat',
    kanban: '/api/kanban',
    calendar: '/api/calendar',
    auth: {
        me: '/api/member/profile/brief',
        login: '/api/auth/login/',
        register: '/api/auth/register/',
        create_verification_code: '/api/auth/verification-code',
        verify_code: '/api/auth/verify',
        reset_token: '/api/auth/reset-token',
        verify_reset_token: '/api/auth/reset-token/',
        reset_password: 'api/auth/reset-token/',
    },
    teacher: {
        get_class: '/api/teacher/dashboard/students/classes/',
        get_classes_list: '/api/teacher/dashboard/class',
        get_skills_by_page: (firstPage, lastPage, grade) =>
            `/api/teacher/homework/brief-skills/?firstPage=${firstPage}&lastPage=${lastPage}&grade=${grade}`,
        post_new_homework: (firstPage, lastPage, grade) =>
            `/api/teacher/homework/?firstPage=${firstPage}&lastPage=${lastPage}&grade=${grade}`,
        edit_homework: (homework_id, firstPage, lastPage) =>
            `/api/teacher/homework/${homework_id}/update/?firstPage=${firstPage}&lastPage=${lastPage}`,

        get_homeworks_by_class: (classId) => `/api/teacher/homework/class/${classId}/`,
        get_current_homeworks: `/api/teacher/homework/dashboard/`,
        get_class_homework_skills: (id) => `/api/teacher/homework/${id}/skills/`,
        get_student_homework_skills: (homeworkId, studentId) =>
            `/api/teacher/homework/${homeworkId}/student-skills/?userId=${studentId}`,
        get_class_by_homework: (homeworkId) => `/api/teacher/homework/${homeworkId}/`,
        get_skills_by_class: (id) => `/api/member/skills/?classId=${id}`,
        get_students_by_class: (id, page = '', size = '', word = '') =>
            `/api/teacher/dashboard/students/student-records/?searchedWord=${word}&classId=${id}&page=${page}&size=${size}`,
        get_students_by_homework: (id, page = '', size = '') =>
            `/api/teacher/homework/${id}/students/?page=${page}&size=${size}`,
        comment: (id) => `/api/teacher/homework/${id}/comment/`,
        get_brief_homework_report: (homeworkId, studentId) =>
            `/api/teacher/homework/${homeworkId}/report/?userId=${studentId}`,
        delete_homework: (homeworkId) => `/api/teacher/homework/${homeworkId}/`,
        patch_homework_deadline: (homeworkId, endDate) => `/api/teacher/homework/${homeworkId}/?endDate=${endDate}`,
        get_homework_detail: (homework_id) => `/api/teacher/homework/${homework_id}/update/`,
        get_homework_brief: (homework_id, user_id) => `/api/teacher/homework/${homework_id}/report/?userId=${user_id}`,
        get_student_profile: (student_id) => `/api/teacher/dashboard/class/student/${student_id}/`,
        get_student_detail: (student_id, page, size) =>
            `/api/teacher/homework/student/?userId=${student_id}&page=${page}&size=${size}`,
        get_next_level: (isNext, questionId) => `/api/teacher/questions/?isNext=${isNext}&questionId=${questionId}`,
    },
    profile: {
        profile: '/api/member/profile/',
        updateProfile: '/api/member/profile/',
        setPicture: '/api/auth/set-profile-picture/',
    },
    mail: {
        list: '/api/mail/list',
        details: '/api/mail/details',
        labels: '/api/mail/labels',
    },
    post: {
        list: '/api/post/list',
        details: '/api/post/details',
        latest: '/api/post/latest',
        search: '/api/post/search',
    },
    product: {
        list: '/api/product/list',
        details: '/api/product/details',
        search: '/api/product/search',
    },
    skills: {
        get: (id) => `/api/member/skills/?classId=${id}`,
    },
    question: {
        get: (questionKey) => `/api/member/questions/?skillName=${questionKey}`,
        answer: (isEmpty, questionId) => `/api/member/questions/?isEmpty=${isEmpty}&questionId=${questionId}`,
    },
    student: {
        homeworks: (id) => `/api/member/homework/class/${id}/`,
        get_current_homeworks: '/api/member/homework/dashboard/',
        get_homework_question: (Qkey, Hkey) => `/api/member/questions/?skillName=${Qkey}&homeworkId=${Hkey}`,
        answer_homework_question: (id) => `/api/member/questions/?questionId=${id}`,
        get_homework_skills: (homeworkId) => `/api/member/homework/${homeworkId}/skills/`,
        get_homework_report: (homeworkId) => `/api/member/homework/${homeworkId}/report/`,
    },
};
