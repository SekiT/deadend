export const NoRouteFoundForDefaultPath = path => ({
  name: 'NoRouteFoundForDefaultPath',
  message: `No route found for the defaultPath: '${path}'`,
});

export default class Router {
  constructor(location, defaultPath, routes) {
    this.location = location;
    this.routes = routes;
    const { matches } = Router.traverse(defaultPath, routes);
    if (matches.length === 0) {
      throw NoRouteFoundForDefaultPath(defaultPath);
    }
  }

  startTracking(window) {
    window.addEventListener('hashchange', ({ newURL }) => {
      const newPath = new URL(newURL).hash.slice(1); // Trim leading '#'
      this.moveTo(newPath);
    });
  }

  static traverse(path, routes, matches = [], matchedPath = '') {
    let found = null;
    routes.find((route) => {
      const result = route.match(path);
      if (result === null) {
        return false;
      }
      found = { route, result };
      return true;
    });
    if (found === null) {
      return { path: matchedPath, matches };
    }
    const { result: { path: matchedPart }, route: { children } } = found;
    if (children.length > 0) {
      const childPath = path.substring(matchedPart.length);
      return Router.traverse(childPath, children, [...matches, found], matchedPath + matchedPart);
    }
    return { path: matchedPath + matchedPart, matches: [...matches, found] };
  }

  moveTo(path) {
    const { path: matchedPath, matches } = Router.traverse(path, this.routes);
    this.location.replace(`#${matchedPath}`);
    matches.forEach(({ route, result: { params } }) => {
      route.handler({ path: matchedPath, params });
    });
    return matchedPath;
  }
}
