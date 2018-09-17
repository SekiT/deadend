import view from '../lib/view';

export default view('deadend-home', [], () => ({
  html: `
    <h1 class="home-title">deadend</h1>
    <p>My deadend of frontend</span>
    <ul>
      <li><a href="#/input">Using input</a></li>
      <li><a href="#/http">Using HTTP</a></li>
      <li><a href="#/tick">Using tick event</a></li>
    </ul>
  `,
  attachments: {},
}));
