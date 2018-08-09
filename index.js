import Router from './core/Router';
import Route from './core/Route';

const router = new Router(window.location, '/', [
  new Route('/', () => {}, [
    new Route('foo', () => {}),
    new Route('bar/:barName', ({ params }) => { console.log(params); }),
  ]),
]);

router.moveTo('/bar/baz');
router.startTracking(window);
