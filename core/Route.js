export default class Route {
  constructor(pathTemplate, handler, children = []) {
    const regexSource = pathTemplate
      .split('/')
      .slice(1)
      .map(encodeURI)
      .map(fragment => (fragment.startsWith(':') ? `(?<${fragment.slice(1)}>[^/]+)` : fragment))
      .join('/');
    this.pathRegex = new RegExp(`^/${regexSource}$`);
    this.handler = handler;
    this.children = children;
  }

  match(path) {
    const result = this.pathRegex.exec(path);
    if (result && result.groups) {
      return {
        path: result[0],
        params: result.groups,
      };
    }
    return null;
  }
}
