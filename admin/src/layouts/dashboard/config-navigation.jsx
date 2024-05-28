import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'Sự kiện',
    path: '/events',
    icon: icon('ic_event'),
  },
  {
    title: 'Group',
    path: '/group',
    icon: icon('ic_group'),
  },
  {
    title: 'Vé',
    path: '/tickets',
    icon: icon('ic_ticket'),
  },
  {
    title: 'Khu Vực',
    path: '/areas',
    icon: icon('ic_area'),
  },
];

export default navConfig;
