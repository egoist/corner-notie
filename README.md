# notie

[![NPM version](https://img.shields.io/npm/v/corner-notie.svg?style=flat-square)](https://www.npmjs.com/package/corner-notie)
[![NPM download](https://img.shields.io/npm/dm/corner-notie.svg?style=flat-square)](https://www.npmjs.com/package/corner-notie)

A corner tip utility.

## Install

Hot-link the `./browser/notie.js` in your web page directly, CSS is automatically included.

or via NPM:

```bash
npm i -S corner-notie
```

## Usage

```javascript
// if you are using webpack
import notie from 'corner-notie'
// tell notie to show `hello world` info and auto-hide it.
notie('info', 'hello world', true)
// or use object as argument
notie({
  type: 'info',
  text: 'hello world',
  autoHide: true
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
