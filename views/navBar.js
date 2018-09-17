import view, { update } from '../lib/view';

const navItem = (newPath, path, text) => `
  <a href="#/${path}" class="navbar-item${newPath === path ? ' active' : ''}">${text}</a>
`;

export default view('deadend-navbar', [''], newPath => ({
  html: `
    <nav>
      <a class="title" href="#">deadend</a>
      ${navItem(newPath, 'input', 'Using input')}
      ${navItem(newPath, 'http', 'Using HTTP')}
      ${navItem(newPath, 'tick', 'Using tick event')}
      <a class="navbar-item" href="http://github.com/SekiT/deadend">GitHub</a>
    </nav>
  `,
  attachments: {
    nav: {
      onclick: () => update('deadend-navbar')('clicked'),
    },
  },
}));
