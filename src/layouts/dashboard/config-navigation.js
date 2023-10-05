import { useMemo } from 'react';
import Iconify from 'src/components/iconify';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';
import { useAuthContext } from 'src/auth/hooks';
// config
import { ROLES } from 'src/config-global';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
    job: icon('ic_job'),
    blog: icon('ic_blog'),
    chat: icon('ic_chat'),
    mail: icon('ic_mail'),
    user: icon('ic_user'),
    file: icon('ic_file'),
    lock: icon('ic_lock'),
    tour: icon('ic_tour'),
    order: icon('ic_order'),
    label: icon('ic_label'),
    blank: icon('ic_blank'),
    kanban: icon('ic_kanban'),
    folder: icon('ic_folder'),
    banking: icon('ic_banking'),
    booking: icon('ic_booking'),
    invoice: icon('ic_invoice'),
    product: icon('ic_product'),
    calendar: icon('ic_calendar'),
    disabled: icon('ic_disabled'),
    external: icon('ic_external'),
    menuItem: icon('ic_menu_item'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    dashboard: icon('ic_dashboard'),
    home: <Iconify icon="solar:home-bold-duotone" />,
    document: <Iconify icon="solar:document-add-bold-duotone" />,
    funDocument: <Iconify icon="solar:file-smile-bold-duotone" />,
    backpack: <Iconify icon="solar:backpack-bold-duotone" />,
    course: <Iconify icon="solar:notebook-bold-duotone" />,
    calculator: <Iconify icon="solar:calculator-minimalistic-bold-duotone" />,
    funEmoji: <Iconify icon="solar:face-scan-square-bold-duotone" />,
    graph: <Iconify icon="solar:graph-up-bold-duotone" />,
    info: <Iconify icon="solar:info-square-bold-duotone" />,
    group: <Iconify icon="solar:users-group-rounded-bold-duotone" />,
    user: <Iconify icon="solar:user-circle-bold-duotone" />,
    money: <Iconify icon="solar:wallet-money-bold-duotone" />,
};

// ----------------------------------------------------------------------

export function useNavDataStudent() {
    const data = useMemo(
        () => [
            // OVERVIEW
            // ----------------------------------------------------------------------
            {
                subheader: 'general',
                items: [
                    { title: 'خانه', path: paths.student.root, icon: ICONS.home },
                    {
                        title: 'درس',
                        path: paths.student.course,
                        icon: ICONS.backpack,
                    },
                    {
                        title: 'تکلیف',
                        path: paths.student.homeworks,
                        icon: ICONS.document,
                    },
                    // {
                    //   title: 'تمرین',
                    //   path: paths.student.exercise,
                    //   icon: ICONS.funDocument,
                    // },
                    // {
                    //     title: 'عملکرد',
                    //     path: paths.student.performance,
                    //     icon: ICONS.graph,
                    // },
                    // {
                    //     title: 'پرداخت',
                    //     path: paths.student.payment,
                    //     icon: ICONS.money,
                    // },
                    {
                        title: 'حساب کاربری',
                        // path: paths.student.profile,
                        icon: ICONS.funEmoji,
                        children: [
                            {
                                title: 'پروفایل',
                                path: paths.student.profile,
                            },
                            {
                                title: 'خروج از حساب',
                                path: '/exit',
                            },
                        ],
                    },
                    // {
                    //   title: 'راهنما',
                    //   path: paths.student.guide,
                    //   icon: ICONS.info,
                    // },
                ],
            },
        ],
        []
    );

    return data;
}

export function useNavDataTeacher() {
    const data = useMemo(
        () => [
            {
                subheader: 'general',
                items: [
                    { title: 'خانه', path: paths.teacher.root, icon: ICONS.home },
                    {
                        title: 'کلاس‌ها',
                        path: paths.teacher.classes,
                        icon: ICONS.backpack,
                    },
                    {
                        title: 'دانش‌آموزان',
                        path: paths.teacher.students,
                        icon: ICONS.group,
                    },
                    // {
                    //     title: 'حساب کاربری',
                    //     path: paths.teacher.profile,
                    //     icon: ICONS.user,
                    // },
                    {
                        title: 'حساب کاربری',
                        // path: paths.teacher.profile,
                        icon: ICONS.funEmoji,
                        children: [
                            {
                                title: 'پروفایل',
                                path: paths.teacher.profile,
                            },
                            {
                                title: 'خروج از حساب',
                                path: '/exit',
                            },
                        ],
                    },
                    // {
                    //   title: 'راهنما',
                    //   path: paths.teacher.guide,
                    //   icon: ICONS.info,
                    // },
                ],
            },
        ],
        []
    );

    return data;
}

export default function useNavData() {
    const { user } = useAuthContext();

    const student = useNavDataStudent();
    const teacher = useNavDataTeacher();

    if (user?.role === ROLES.student) return student;
    else return teacher;
}
