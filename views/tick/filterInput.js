import view from '../../lib/view';
import filterInputSubject from '../../subjects/filterInputSubject';
import filterInputOutput from './filterInputOutput';

const name = 'deadend-tick-exclusive-control';

export default view(name, [], () => ({
  html: `
    <div>
      <button class="a">A</button><button class="b">B</button><button class="c">C</button>
      <${filterInputOutput}></${filterInputOutput}>
    </div>
  `,
  attachments: {
    'button.a': {
      onclick: () => filterInputSubject.next('A'),
    },
    'button.b': {
      onclick: () => filterInputSubject.next('B'),
    },
    'button.c': {
      onclick: () => filterInputSubject.next('C'),
    },
  },
}));
