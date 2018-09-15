import view, { update } from '../lib/view';

export default view('deadend-navbar', [''], path => ({
  html: `
    <nav>
      <a class="title" href="#">deadend</a>
      path: ${path}
    </nav>
  `,
  attachments: {
    nav: {
      onclick: () => update('deadend-navbar')('clicked'),
    },
  },
}));
