import view from '../lib/view';

export default view('deadend-input', [], () => ({
  html: `
    <h1>Using input</h1>
    <p>
      This view contains &lt;input&gt;
    </p>
    <input type="text"><button>Click</button>
  `,
  attachments: {
    input: {
      oninput: ({ target }) => console.log(target.value),
    },
  },
}));
