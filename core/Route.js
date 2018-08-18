export default class Route {
  constructor(pathTemplate, handler, children = []) {
    this.paramNames = [];
    const regexSource = pathTemplate
      .split('/')
      .map(encodeURI)
      .map((fragment) => {
        if (fragment.startsWith(':')) {
          this.paramNames.push(fragment.slice(1));
          return '([^/]+)';
        }
        return fragment;
      })
      .join('/');
    this.pathRegex = new RegExp(`^${regexSource}`);
    this.handler = handler;
    this.children = children;
  }

  match(path) {
    const result = this.pathRegex.exec(path);
    if (result) {
      const params = {};
      this.paramNames.forEach((paramName, index) => {
        params[paramName] = result[index + 1];
      });
      return {
        path: result[0],
        params,
      };
    }
    return null;
  }
}
