const viewStore = {};

export default (tagName, defaultArgs, fun) => {
  customElements.define(tagName, class extends HTMLElement {
    constructor() {
      super();
      const id = this.getAttribute('id') || '';
      if (viewStore[tagName] === undefined) {
        viewStore[tagName] = {};
      }
      viewStore[tagName][id] = { element: this, fun };
      this.innerHTML = fun(...defaultArgs);
    }
  });
  return tagName;
};

export const update = (tagName, id = '') => (...args) => {
  if (viewStore[tagName] === undefined) {
    return;
  }
  const { element, fun } = viewStore[tagName][id];
  element.innerHTML = fun(...args);
};
