import view, { update } from '../lib/view';

export default view('deadend-navbar', [''], path => ({
  html: `
  <nav>${path}</nav>
  `,
  eventListeners: {
    nav: {
      onclick: () => update('deadend-navbar')('clicked'),
    },
  },
}));
