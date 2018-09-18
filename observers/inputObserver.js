import inputSubject from '../subjects/inputSubject';
import { update } from '../lib/view';

export default outputView => inputSubject.subscribe(value => update(outputView)(value));
