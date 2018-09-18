import view from '../lib/view';
import inputObserver from '../observers/inputObserver';

const name = 'deadend-near-realtime-output';

export default view(name, [''], value => ({
  html: `
    <p>
      This is updated near-realtime. Value is: ${value}
    </p>
  `,
  attachments: {},
}));

inputObserver(name);
