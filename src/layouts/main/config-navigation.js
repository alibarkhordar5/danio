// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'خانه',
    icon: <Iconify icon="solar:home-smile-bold-duotone" />,
    path: '/',
  },
  {
    title: 'درباره ما',
    icon: <Iconify icon="solar:info-square-bold-duotone" />,
    path: paths.about,
  },
  {
    title: 'معرفی',
    path: '/introduction',
    icon: <Iconify icon="solar:clipboard-list-bold-duotone" />,
    children: [
      {
        items: [
          { title: 'برای دانش‌آموزان', path: paths.introduction.students },
          { title: 'برای معلمان', path: paths.introduction.teachers },
          { title: 'برای مدارس و سازمان‌ها', path: paths.introduction.schools },
        ],
      },
    ],
  },
  {
    title: 'تماس با ما',
    icon: <Iconify icon="solar:call-medicine-rounded-bold-duotone" />,
    path: paths.contact,
  },
];
