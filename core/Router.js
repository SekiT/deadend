export const NoRouteFoundForDefaultPath = path => ({
  name: 'NoRouteFoundForDefaultPath',
  message: `No route found for the defaultPath: '${path}'`,
});

export default class Router {
  constructor(window, defaultPath = '/', routes) {
    this.location = window.location;
    this.routes = routes;
    const { path, matches } = Router.traverse(defaultPath, routes);
    if (matches.length === 0) {
      throw NoRouteFoundForDefaultPath(defaultPath);
    }
    this.defaultPath = path;
  }

  // Returns:
  // {
  //   path: string,
  //   matches: [
  //     {
  //       route: Route,
  //       result: {
  //         path: string,
  //         params: { *paramName*: string },
  //       },
  //     }
  //   ],
  // }
  static traverse(path, routes, matches = [], matchedPath = '') {
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
      return { path: matchedPath, matches };
    }
    const {
      result: { path: matchedPart },
      route: { children },
    } = found;
    if (children.length > 0) {
      const childPath = path.split(matchedPart).slice(1).join('');
      return Router.traverse(childPath, children, [...matches, found], matchedPath + matchedPart);
    }
    return { path: matchedPath + matchedPart, matches: [...matches, found] };
  }

  moveTo(path) {
    const { path: matchedPath, matches } = Router.traverse(path, this.routes);
    this.location.hash = matchedPath;
    matches.forEach(({ route, result }) => route.handler(result));
    return matchedPath;
  }
}
