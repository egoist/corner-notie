import './notie.css'
import error from './svg/icon-error.svg'
import success from './svg/icon-success.svg'
import warning from './svg/icon-warning.svg'
import info from './svg/icon-info.svg'

const svgs = {
  info,
  success,
  warning,
  error,
}

const $ = document.querySelector.bind(document)

const domEach = (els, fn) => {
  Array.prototype.forEach.call(els, fn)
}

class Notie {

  constructor(text, opts) {
    this.text = text
    this.opts = opts
    this.events = {}
    this.notify()
  }

  init() {
    const noties = $(`.noties-${this.opts.position}`)
    if (!noties) {
      this.noties = document.createElement('div')
      this.noties.className = `noties noties-${this.opts.position}`
      $('body').appendChild(this.noties)
    } else {
      this.noties = noties
    }
  }

  notify() {
    this.init()
    this.notie = document.createElement('div')
    this.notie.style.width = `${this.opts.width}px`
    this.notie.className = `notie notie-${this.opts.type}${this.opts.autoHide ? '' : ' notie-auto-hide-disabled'}`
    this.notie.innerHTML = `
    <div class="notie-body">
      <span class="notie-svg">${svgs[this.opts.type]}</span>
      <span class="notie-text">${this.text}</span>
    </div>
    `
    // add new notie
    const firstChild = this.noties.firstChild
    this.noties.insertBefore(this.notie, firstChild)

    // show notie
    setTimeout(() => {
      this.notie.classList.add('notie-shown')
    }, 100)

    // auto hide
    if (this.opts.autoHide) {
      this.startTimeout()
    }

    this.registerEvents()
  }

  registerEvents() {
    if (this.opts.autoHide) {
      this.events.mouseover = () => {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.events.mouseleave = () => this.startTimeout()
      this.notie.addEventListener('mouseover', this.events.mouseover, false)
      this.notie.addEventListener('mouseleave', this.events.mouseleave, false)
    } else {
      this.notie.addEventListener('click', () => this.removeNotie())
      domEach(this.notie.querySelectorAll('[notie-prevent]'), (el) => {
        el.addEventListener('click', (e) => {
          e.stopPropagation()
        }, false)
      })
    }
  }

  startTimeout(timeout = this.opts.timeout) {
    this.timeout = setTimeout(() => {
      this.removeNotie()
    }, timeout)
  }

  removeNotie(notie = this.notie) {
    notie.classList.remove('notie-shown')
    setTimeout(() => {
      this.noties.removeChild(notie)
      notie = null
    }, 200)
  }
}

const notie = (text = '', {
  position = 'top-right',
  type = 'info',
  autoHide = true,
  timeout = 3000,
  width = 240
} = {}) => {
  return new Notie(text, {
    type,
    position,
    autoHide,
    timeout,
    width,
  })
}

export default notie
