import view from '../lib/view';
import navbar from './navbar';

export default view('deadend-root', [], () => `
  <${navbar}></${navbar}>
`);
