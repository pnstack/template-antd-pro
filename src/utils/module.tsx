import { isArray } from 'lodash';

import { ModuleConfig, RouteConfig } from '@/types';


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
      component: `./../pages/${name}/pages/${route.component}`,
    };
  });
};

export class AppModule {
  routes: RouteConfig[];
  modules: any[] = [];
  constructor(routes: RouteConfig[]) {
    this.routes = routes;
  }

  register(module: ModuleConfig) {
    this.modules.push(module);
  }

  getRoutes() {
    const modulesRoutes = this.modules.map((module) => {
      const route: RouteConfig = {
        ...module,
        routes: mapRoutesComponent(module.routes, module.name),
      };
      return route;
    });
    // flat and join all routes
    return this.routes.concat(modulesRoutes.flat(Infinity));
  }
}
