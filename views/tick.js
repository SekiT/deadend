import view from '../lib/view';
import tickSubject from '../subjects/tickSubject';
import tickEverySecond from './tick/tickEverySecond';

export default view('deadend-tick', [], () => ({
  html: `
    <h1>Using tick event</h1>
    <${tickEverySecond}></${tickEverySecond}>
  `,
  attachments: {
    h1: {
      none: tickSubject.init(0),
    },
  },
}));
