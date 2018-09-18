import tickSubject from './tickSubject';

const container = {
  pressed: 'none',
  observers: [],
};

const next = (pressed) => {
  container.pressed = pressed;
};

const onNext = pressed => container.observers.forEach(observer => observer(pressed));

const subscribe = (observer) => {
  container.observers.push(observer);
};

tickSubject.subscribe(() => {
  onNext(container.pressed);
});

export default { next, subscribe };
