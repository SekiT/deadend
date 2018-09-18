const container = {
  value: '',
  observers: [],
};

const next = (value) => {
  container.value = value;
  container.observers.forEach(observer => observer(value));
};

const subscribe = (observer) => {
  container.observers.push(observer);
};

const get = () => container.value;

export default { next, get, subscribe };
