import view from '../../lib/view';

export default view('deadend-http-output', [''], text => ({
  html: `
    <p>Fetched text: "${text}"</p>
  `,
  attachments: {},
}));
