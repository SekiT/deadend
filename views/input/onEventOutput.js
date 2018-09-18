import view, { update } from '../../lib/view';
import inputSubject from '../../subjects/inputSubject';

const name = 'deadend-on-event-output';

export default view(name, [''], value => ({
  html: `
    <p>
      This is updated when <button class="updater">this button</button> is clicked. Value is: ${value}
    </p>
  `,
  attachments: {
    'button.updater': {
      onclick: () => update(name)(inputSubject.get()),
    },
  },
}));
