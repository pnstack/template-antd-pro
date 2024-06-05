import { IConfigFromPlugins } from '@/.umi/core/pluginConfig';
import todoModule from '../src/modules/todo';
import { AppModule } from '../src/utils/module';

const routes: IConfigFromPlugins['routes'] = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },

  {
    path: '/welcome',
    name: 'Hello',
    icon: 'smile',
    component: './hello',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

const appModules = new AppModule(routes);
appModules.register(todoModule);

export default appModules.getRoutes();
