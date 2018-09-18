const container = {
  count: 0,
  observers: [],
  timer: 0,
};

const onNext = (count) => {
  container.observers.forEach(observer => observer(count));
};

const init = (count) => {
  clearInterval(container.timer);
  container.timer = setInterval(() => {
    onNext(container.count += 1);
  }, 1000);
  onNext(container.count = count);
};

const subscribe = ((observer) => {
  container.observers.push(observer);
});

export default { init, subscribe };
