import view from '../lib/view';
import navbar from './navbar';

export default view('deadend-root', [], () => ({
  html: `
    <${navbar}></${navbar}>
  `,
  attachments: {},
}));
