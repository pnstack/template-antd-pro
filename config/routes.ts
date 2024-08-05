import { IConfigFromPlugins } from '@/.umi/core/pluginConfig';
import { AppModule } from '../src/utils/module';
import authModule from '../src/pages/auth';

const routes: IConfigFromPlugins['routes'] = [
  {
    path: '/welcome',
    name: 'Hello',
    icon: 'smile',
    component: './hello',
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
appModules.register(authModule);

export default appModules.getRoutes();
