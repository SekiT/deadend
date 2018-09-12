export default class Route {
  constructor(pathTemplate, handler, children = []) {
    this.paramNames = [];
    const regexSource = pathTemplate
      .split('/')
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

  match(rawPath) {
    const result = this.pathRegex.exec(rawPath);
    if (result === null) {
      return null;
    }
    const [path, ...matches] = result;
    const succeedingChar = rawPath.charAt(path.length);
    if (succeedingChar !== '' && succeedingChar !== '/') {
      return null;
    }
    const params = {};
    this.paramNames.forEach((paramName, index) => {
      params[paramName] = matches[index];
    });
    return { path, params };
  }
}
