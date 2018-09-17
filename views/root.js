import view from '../lib/view';
import navbar from './navbar';
import routeSwitch from './routeSwitch';

export default view('deadend-root', [], () => ({
  html: `
    <${navbar}></${navbar}>
    <${routeSwitch}></${routeSwitch}>
  `,
  attachments: {},
}));
