import Router from './lib/Router';
import Route from './lib/Route';

import root from './views/root';
import navBar from './views/navBar';

const router = new Router(window.location, '', [
  new Route('', ({ path }) => navBar(path), [
    new Route('/foo', () => {}),
    new Route('/bar/:barName', () => {}),
  ]),
]);

// Initialize dom tree
root(navBar(''));

router.moveTo('/bar/baz');
router.startTracking(window);
