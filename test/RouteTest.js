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

  test('Route matches correctly', (t) => {
    [
      ['/', '/', { path: '/', params: {} }],
      ['/', '/path', { path: '/', params: {} }],
      ['/', '', null],
      ['/', 'path', null],
      ['/path', '/path', { path: '/path', params: {} }],
      ['/path1', '/path1/path2', { path: '/path1', params: {} }],
      ['/path1', '/path2/path1', null],
      ['/:param', '/value', { path: '/value', params: { param: 'value' } }],
      ['/:param1/:param2', '/value1/value2/path', { path: '/value1/value2', params: { param1: 'value1', param2: 'value2' } }],
      ['/path/:param', '/path/value/subpath', { path: '/path/value', params: { param: 'value' } }],
    ].forEach(([template, path, expected]) => {
      const route = new Route(template, () => {}, []);
      t.deepEqual(route.match(path), expected);
    });
    t.end();
  });
};
