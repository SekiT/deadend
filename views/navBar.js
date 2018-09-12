import { wire } from '../node_modules/hyperhtml/esm/index';

const render = wire();

export default path => render`<nav>${path}</nav>`;
