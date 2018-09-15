export const InvalidViewName = name => ({
  name: 'InvalidViewName',
  message: `Invalid view name: '${name}'`,
});

const viewStore = {};

export default (viewName, defaultArgs, fun) => {
  if (!/[a-z][a-z0-9_.-]*-[a-z0-9_.-]*/.test(viewName)) {
    throw InvalidViewName(viewName);
  }
  customElements.define(viewName, class extends HTMLElement {
    constructor() {
      super();
      const id = this.getAttribute('id') || '';
      if (viewStore[viewName] === undefined) {
        viewStore[viewName] = {};
      }
      viewStore[viewName][id] = { element: this, fun };
      this.innerHTML = fun(...defaultArgs);
    }
  });
  return viewName;
};

export const update = (viewName, id = '') => (...args) => {
  if (viewStore[viewName] === undefined) {
    return;
  }
  const { element, fun } = viewStore[viewName][id];
  element.innerHTML = fun(...args);
};
