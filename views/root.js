import { bind } from '../node_modules/hyperhtml/esm/index';

const render = bind(document.getElementById('root'));

export default navbar => render`${navbar}`;
