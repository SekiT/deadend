import view from '../lib/view';
import inputSubject from '../subjects/inputSubject';
import nearRealtimeOutput from './nearRealtimeOutput';
import onEventOutput from './onEventOutput';

export default view('deadend-input', [], () => ({
  html: `
    <h1>Using input</h1>
    <p>
      deadend is not reactive. Event listeners call subject.next and observers update the view.
    </p>
    <input type="text"><button class="setter">Set random value to the subject</button>
    <${nearRealtimeOutput}></${nearRealtimeOutput}>
    <${onEventOutput}></${onEventOutput}>
  `,
  attachments: {
    input: {
      oninput: ({ target }) => inputSubject.next(target.value),
    },
    'button.setter': {
      onclick: () => inputSubject.next(['deadend', 'lorem ipsum', 'quick fox'][new Date() % 3]),
    },
  },
}));
