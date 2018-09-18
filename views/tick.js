import view from '../lib/view';
import tickSubject from '../subjects/tickSubject';
import tickEverySecond from './tick/tickEverySecond';
import exclusiveControl from './tick/exclusiveControl';

export default view('deadend-tick', [], () => ({
  html: `
    <h1>Using tick event</h1>
    This view initializes count by using attachments, though it seems dirty.
    <${tickEverySecond}></${tickEverySecond}>
    You can do exclusive control by ticks.
    <${exclusiveControl}></${exclusiveControl}>
  `,
  attachments: {
    h1: {
      none: tickSubject.init(0),
    },
  },
}));
