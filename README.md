# corner-notie

[![NPM version](https://img.shields.io/npm/v/corner-notie.svg?style=flat-square)](https://www.npmjs.com/package/corner-notie)
[![NPM download](https://img.shields.io/npm/dm/corner-notie.svg?style=flat-square)](https://www.npmjs.com/package/corner-notie)

A corner tip utility.

## Install

Hot-link the [IIFE version](https://unpkg.com/corner-notie/browser/notie.js) in your web page directly, CSS is automatically included.

or via NPM:

```bash
npm i -S corner-notie
```

## Usage

```javascript
// if you are using webpack/browserify
import notie from 'corner-notie'

notie('hello world')

// default options
notie('', {
  type: 'info', // info | warning | success | danger
  autoHide: true,
  timeout: 3000,
  position: 'top-right',
  width: 240
})
```

## Positions

top-right | top-left | top-center<br>
bottom-right | bottom-left | bottom-center<br>

## Click to hide notie

When `autoHide` is set to be `false`, you can click on the notie to hide it. In this way you may not want to hide notie when clicking on a `href`. Set attribute `notie-prevent` on that element to prevent from being hidden by clicking there.

```js
notie('hello <a notie-prevent href="/u/egoist">egoist</a>', {
  type: 'success',
  autoHide: false
})
```

## Development

```bash
# build for webpack and browser
# run this each time you want to make new release
npm run build
# run gulp for development
npm run dev
```

## License

MIT.
