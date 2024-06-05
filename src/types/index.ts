/**
 * @name RouteConfig
 * @description Configuration for Umi routes. Only supports path, component, routes, redirect, wrappers, name, and icon.
 * @doc https://umijs.org/docs/guides/routes
 */
export interface RouteConfig {
  /**
   * @description Path supports two types of placeholders: dynamic parameter in the form of :id and wildcard * which can only appear at the end of the route string.
   */
  path?: string;

  /**
   * @description The path to the React component to render when location matches the path. Can be an absolute or relative path. If relative, it will start from src/pages.
   */
  component?: string;

  /**
   * @description Sub-routes configuration, usually used when adding a layout component for multiple paths.
   */
  routes?: RouteConfig[];

  /**
   * @description Route redirection configuration.
   */
  redirect?: string;

  /**
   * @description Configuration for wrapper components, which can add more functionality to the current route component. For example, it can be used for route-level permission checks.
   */
  wrappers?: string[];

  /**
   * @description Route title configuration. By default, it reads the value from the internationalization file menu.ts under menu.xxxx. For example, if name is login, it reads the value of menu.login from menu.ts as the title.
   */
  name?: string;

  /**
   * @description Configuration for the route icon. Refer to https://ant.design/components/icon-cn. Remove style suffixes and adjust case as needed. For example, for <StepBackwardOutlined />, use stepBackward or StepBackward; for <UserOutlined />, use user or User.
   */
  icon?: string;
}
