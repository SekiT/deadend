import view, { update } from '../lib/view';
import httpOutput from './http/httpOutput';

export default view('deadend-http', [], () => ({
  html: `
    <h1>Using HTTP</h1>
    <p>
      Fetch API suffices. You may use subject, but chaining promises is enough for most cases.
    </p>
    <button>Fetch</button>
    <${httpOutput}></${httpOutput}>
  `,
  attachments: {
    button: {
      onclick: () => {
        fetch('data/data.txt')
          .then(res => res.text())
          .then(text => update(httpOutput)(text))
          .catch(error => update(httpOutput)(`${error}`));
      },
    },
  },
}));
