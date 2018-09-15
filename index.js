import Router from './lib/Router';
import Route from './lib/Route';
import { update } from './lib/view';
import views from './views/index';

const { root, navbar } = views;

const router = new Router(window.location, '', [
  new Route('', ({ path }) => update(navbar)(path), [
    new Route('/foo', () => {}),
    new Route('/bar/:barName', () => {}),
  ]),
]);

// Initialize Views
document.getElementById('root').innerHTML = `<${root}></${root}>`;

router.moveTo('/bar/baz');
router.startTracking(window);
