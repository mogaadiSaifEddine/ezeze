import { INavData } from '@coreui/angular';
export interface NavItem extends INavData {
  id: string;
}

export const navItems: NavItem[] = [
  {
    id: 'dashboard',
    name: 'menu.dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },

    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    id: 'menu.your-profile',
    name: 'menu.your-profile'
  },
  {
    id: 'profile',
    name: 'menu.profile',
    url: '/theme/colors',
    iconComponent: { name: 'cilUser' }
  },
  {
    id: 'admin',
    name: 'menu.admin',
    url: '/admin-panel/coupons-list',
    iconComponent: { name: 'cilUser' }
  },

  {
    id: 'chapter',
    name: 'menu.chapter-list',
    url: '/enseignant/chapter-list',
    iconComponent: { name: 'cil-layers' }
  },

  {
    // name: 'menu.parentSpaceTitle',
    id: 'parent',
    name: 'Espace Parent',
    url: '/espace-parent',
    iconComponent: { name: 'cil-people' }
  },

  {
    id: 'modules',
    name: 'menu.modules',
    title: true
  },
  {
    id: 'revision',
    name: 'menu.revision',
    url: '/revision/matieres',
    iconComponent: { name: 'cil-layers' }
  },

  {
    id: 'clubs',
    name: 'menu.clubs',
    url: '/clubs',
    iconComponent: { name: 'cil-layers' }
  },
  {
    id: 'clubs',
    name: 'menu.clubs',
    title: true
  },
  {
    id: 'chat',
    name: 'menu.chat',
    url: '/chat',
    iconComponent: { name: 'cil-cursor' }
  }
];
