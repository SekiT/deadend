import Router from './lib/Router';
import Route from './lib/Route';
import { update } from './lib/view';
import views from './views/index';

const { root, navbar, routeSwitch } = views;

const handlePath = path => () => {
  update(navbar)(path);
  update(routeSwitch)(path);
};

const handleRoot = ({ path }) => {
  if (path === '') {
    handlePath('home')();
  }
};

const router = new Router(window.location, '', [
  new Route('', handleRoot, [
    new Route('/input', handlePath('input')),
    new Route('/http', handlePath('http')),
    new Route('/tick', handlePath('tick')),
  ]),
]);

// Initialize Views
document.getElementById('root').innerHTML = `<${root}></${root}>`;

router.moveTo('/bar/baz');
router.startTracking(window);
