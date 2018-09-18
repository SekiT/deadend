import view from '../../lib/view';
import exclusiveControlSubject from '../../subjects/exclusiveControlSubject';
import exclusiveControlOutput from './exclusiveControlOutput';

const name = 'deadend-tick-exclusive-control';

export default view(name, [], () => ({
  html: `
    <div>
      <button class="a">A</button><button class="b">B</button><button class="c">C</button>
      <${exclusiveControlOutput}></${exclusiveControlOutput}>
    </div>
  `,
  attachments: {
    'button.a': {
      onclick: () => exclusiveControlSubject.next('A'),
    },
    'button.b': {
      onclick: () => exclusiveControlSubject.next('B'),
    },
    'button.c': {
      onclick: () => exclusiveControlSubject.next('C'),
    },
  },
}));
