# deadend

My deadend of frontend.

## Motivation

Frontend frameworks are overdoing things and too big.

## Concepts

- There is no `Component`, but `view` defined by pure functions.
- States are managed by `subjects`. Not centralized.
- `observers` watch the state change, and do logics or `update` views.
- Aim for less dependencies. Hate npm trash.

## Try locally

```sh
$ npm i
$ npm run watch

# In another shell
$ open "http://localhost:10001/index.html"
```

## The way of deadend

You may stop, then find the right way.

### View

#### `view(viewName, defaultArgs, fun)`

Defines a `view`.

`viewName` (and `id` attribute) is used to identify the element.
It must be a [valid custom element name](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name).

`defaultArgs` is the default arguments of `fun`

`fun` must be of type: `any => { html, attachments }`
  - `html` is the innerHTML of the element.
  - `attachments` is of type: `{ (query): (attributes) }`
    - `query` is passed to querySelector to identify the element
    - `attributes` are assigned to the found element

It returns `viewName`.

Example:

```js
const greet = view('myapp-greet', ['world'], name => ({
  html: `
    <p>Hello, ${name}!</p>
    <button>Click me</button>
  `,
  attachments: {
    button: {
      onclick: () => window.alert(`Hello, ${name}!`),
    },
  },
}));

const container = view('myapp-container', [], color => ({
  html: `
    <${greet}></${greet}>
  `,
  attachments: {
    [greet]: {
      style: `background-color:${color};`,
    },
  },
}));

document.body.innerHTML = `<${container}></${container}>`;
```

Note that `container` has no way to specify the `name` of child `greet` view.

If you want to update the `name`, just updating only `greet` suffices.

#### `update(viewName, id = '')(args)`

Updates the view by passing `args` to the view function.

For example `update(greet)('John')` updates the `greet` view above.
