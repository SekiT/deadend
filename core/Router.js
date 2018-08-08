export const NoRouteFoundForDefaultPath = path => ({
  name: 'NoRouteFoundForDefaultPath',
  message: `No route found for the defaultPath: '${path}'`,
});

export default class Router {
  constructor(location, defaultPath = '/', routes) {
    this.location = location;
    this.routes = routes;
    const matches = Router.traverse(defaultPath, routes);
    if (matches.length === 0) {
      throw NoRouteFoundForDefaultPath(defaultPath);
    }
    this.defaultPath = matches[matches.length - 1].result.path;
  }

  // Returns the `matches`:
  // [
  //   {
  //     route: Route,
  //     result: {
  //       path: string,
  //       params: { *paramName*: string },
  //     },
  //   }
  // ]
  static traverse(path, routes, matches = []) {
    let found = null;
    routes.find((route) => {
      // route.match returns null | { path: string, params: { *paramName*: string }}
      const result = route.match(path);
      if (result !== null) {
        found = { route, result };
        return true;
      }
      return false;
    });
    if (found === null) {
      return [];
    }
    const { route: { children } } = found;
    if (children.length > 0) {
      const childPath = path.split(found.result.path).slice(1).join('');
      return Router.traverse(childPath, children, [...matches, found]);
    }
    return [...matches, found];
  }

  moveTo(path) {
    const matches = Router.traverse(path, this.routes);
    const actualPath = matches[matches.length - 1].result.path;
    this.location.hash = actualPath;
    return matches.reduce('', (matchedPath, { route, result }) => {
      route.handler(result);
      return matchedPath + result.path;
    });
  }
}
