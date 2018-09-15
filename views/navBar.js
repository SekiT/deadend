import view, { update } from '../lib/view';

export default view('deadend-navbar', [''], path => ({
  html: `
  <nav>${path}</nav>
  `,
  attachments: {
    nav: {
      onclick: () => update('deadend-navbar')('clicked'),
      style: `
        position:fixed;
        top:0px;
        left:0px;
        width:100%;
        height:55px;
        background:linear-gradient(to bottom, #cccccc 80%, #333333);
      `,
    },
  },
}));
