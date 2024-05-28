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
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Group',
    path: '/group',
    icon: icon('ic_lock'),
  },
  {
    title: 'Vé',
    path: '/tickets',
    icon: icon('ic_lock'),
  },
  {
    title: 'Khu Vực',
    path: '/areas',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
