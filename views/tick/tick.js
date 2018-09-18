import view from '../../lib/view';
import tickSubject from '../../subjects/tickSubject';
import tickEverySecond from './tickEverySecond';
import filterInput from './filterInput';

export default view('deadend-tick', [], () => ({
  html: `
    <h1>Using tick event</h1>
    This view initializes count by using attachments, though it seems dirty.
    <${tickEverySecond}></${tickEverySecond}>
    You can filter inputs by ticks. This will be useful to control multiple simultaneous inputs.
    <${filterInput}></${filterInput}>
  `,
  attachments: {
    h1: {
      none: tickSubject.init(0),
    },
  },
}));
