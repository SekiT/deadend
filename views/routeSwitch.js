import view from '../lib/view';
import home from './home';
import input from './input';
import http from './http';
import tick from './tick';

const pathToView = {
  home, input, http, tick,
};

export default view('deadend-route-switch', ['home'], (path) => {
  const targetView = pathToView[path];
  return {
    html: `
      <${targetView}></${targetView}>
    `,
    attachments: {},
  };
});
