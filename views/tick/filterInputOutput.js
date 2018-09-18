import view, { update } from '../../lib/view';
import filterInputSubject from '../../subjects/filterInputSubject';

const name = 'deadend-tick-exclusive-control-output';

export default view(name, ['none'], pressed => ({
  html: `
    <div>Last pressed in a tick: ${pressed}</div>
  `,
  attachments: {},
}));

filterInputSubject.subscribe((pressed) => {
  update(name)(pressed);
});
