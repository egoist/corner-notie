# notie

A corner tip utility for [Chelly](https://github.com/egoist/chelly).

## Install

Hot-link the `./browser/notie.js` in your web page directly, CSS is automatically included.

or via NPM:

```bash
npm i -S notie
```

## Usage

```javascript
// if you are using webpack
import notie from 'notie'
// tell notie to show `hello world` info and auto-hide it.
notie('info', 'hello world', true)
// or use object as argument
notie({
  type: 'info',
  text: 'hello world',
  autoHide: true
})
```

## License

MIT.
