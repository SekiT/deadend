import Router from './core/Router';
import Route from './core/Route';

const router = new Router(window, '/', [
  new Route('/', (params) => { console.log(params); }, [
    new Route('foo', (params) => { console.log(params); }),
  ]),
]);

router.moveTo('/foo');
