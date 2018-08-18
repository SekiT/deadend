import test from 'tape';
import Route from '../core/Route';

export default () => {
  test('Route parses pathTemplate', (t) => {
    [
      ['/', '^\\/', []],
      ['/path', '^\\/path', []],
      ['/path/', '^\\/path\\/', []],
      ['/path1/path2', '^\\/path1\\/path2', []],
      ['/:param1/:param2', '^\\/([^\\/]+)\\/([^\\/]+)', ['param1', 'param2']],
      ['/path/:param/', '^\\/path\\/([^\\/]+)\\/', ['param']],
      ['/:param/path', '^\\/([^\\/]+)\\/path', ['param']],
    ].forEach(([template, regexSource, paramNames]) => {
      const route = new Route(template, () => {}, []);
      // Here we compare regex source, because regex itself cannot be compared correctly.
      t.equal(route.pathRegex.source, regexSource);
      t.deepEqual(route.paramNames, paramNames);
    });
    t.end();
  });
};
