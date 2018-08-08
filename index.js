import Router from './core/Router';
import Route from './core/Route';

const router = new Router(window, '/', [
  new Route('/', () => {}, [
    new Route('foo', () => {}),
    new Route('bar/:barName', ({ params }) => { console.log(params); }),
  ]),
]);

router.moveTo('/bar/baz');
