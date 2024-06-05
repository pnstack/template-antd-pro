import { RouteConfig } from '@/types';
import { isArray } from 'lodash';

export const mapRoutesComponent: any = (routes: RouteConfig[], name: string) => {
  return routes.map((route: RouteConfig) => {
    if (isArray(route.routes)) {
      return {
        ...route,
        routes: mapRoutesComponent(route.routes, name),
      };
    }
    return {
      ...route,
      component: `./../modules/${name}/pages/${route.component}`,
    };
  });
};

export class AppModule {
  routes: RouteConfig[];
  modules: any[] = [];
  constructor(routes: RouteConfig[]) {
    this.routes = routes;
  }

  register(module) {
    this.modules.push(module);
  }

  getRoutes() {
    const modulesRoutes = this.modules.map((module) =>
      mapRoutesComponent(module.routes, module.config.name),
    );
    // flat and join all routes
    return this.routes.concat(modulesRoutes.flat(Infinity));
  }
}
