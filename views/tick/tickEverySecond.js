import view, { update } from '../../lib/view';
import tickSubject from '../../subjects/tickSubject';

const name = 'deadend-tick-every-second';

export default view(name, [0], count => ({
  html: `
    <p>
      This is updated by every tick: ${count}
    </p>
  `,
  attachments: {},
}));

tickSubject.subscribe(count => update(name)(count));
