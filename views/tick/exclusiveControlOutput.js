import view, { update } from '../../lib/view';
import exclusiveControlSubject from '../../subjects/exclusiveControlSubject';

const name = 'deadend-tick-exclusive-control-output';

export default view(name, ['none'], pressed => ({
  html: `
    <span>Last pressed in a tick: ${pressed}</span>
  `,
  attachments: {},
}));

exclusiveControlSubject.subscribe((pressed) => {
  update(name)(pressed);
});
