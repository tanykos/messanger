// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.XMLHttpRequest = window.XMLHttpRequest;

// require.extensions['.scss'] = function (module) {
//   module.exports = () => ({});
// };
