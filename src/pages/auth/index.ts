import { ModuleConfig } from '@/types';

const authModule: ModuleConfig = {
  path: '/auth',
  name: 'auth',
  layout: false,
  routes: [
    {
      name: 'login',
      path: 'login',
      component: 'login/index',
    },
  ],
};

export default authModule;
