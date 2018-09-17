import Router from './lib/Router';
import Route from './lib/Route';
import { update } from './lib/view';
import views from './views/index';

const { root, navbar, routeSwitch } = views;

const router = new Router(window.location, '', [
  new Route('', ({ path }) => { update(navbar)(path); update(routeSwitch)('home'); }, [
    new Route('/input', () => update(routeSwitch)('input')),
    new Route('/http', () => update(routeSwitch)('http')),
    new Route('/tick', () => update(routeSwitch)('tick')),
  ]),
]);

// Initialize Views
document.getElementById('root').innerHTML = `<${root}></${root}>`;

router.moveTo('/bar/baz');
router.startTracking(window);
