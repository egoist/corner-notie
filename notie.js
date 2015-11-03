'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _notie = require('./notie.css');

var _notie2 = _interopRequireDefault(_notie);

var _iconError = require('./svg/icon-error.svg');

var _iconError2 = _interopRequireDefault(_iconError);

var _iconSuccess = require('./svg/icon-success.svg');

var _iconSuccess2 = _interopRequireDefault(_iconSuccess);

var _iconWarning = require('./svg/icon-warning.svg');

var _iconWarning2 = _interopRequireDefault(_iconWarning);

var _iconInfo = require('./svg/icon-info.svg');

var _iconInfo2 = _interopRequireDefault(_iconInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var svgs = {
  info: _iconInfo2.default, success: _iconSuccess2.default, warning: _iconWarning2.default, error: _iconError2.default
};

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var Notie = (function () {
  function Notie(opts) {
    _classCallCheck(this, Notie);

    this.opts = this.opts || {};
    if (_typeof(opts[0]) === 'object') {
      this.opts = opts[0];
      this.opts.autoHide = typeof this.opts.autoHide === 'undefined' ? true : this.opts.autoHide;
    } else {
      this.opts.type = opts[0];
      this.opts.text = opts[1];
      this.opts.autoHide = typeof opts[2] === 'undefined' ? true : opts[2];
    }
    this.notify();
  }

  _createClass(Notie, [{
    key: 'init',
    value: function init() {
      var noties = document.createElement('div');
      noties.className = 'noties';
      $('body').appendChild(noties);
    }
  }, {
    key: 'notify',
    value: function notify() {
      var _this = this;

      if (!$('.noties')) {
        this.init();
      }
      var notie = document.createElement('div');
      notie.className = 'notie notie-' + this.opts.type + (this.opts.autoHide ? '' : ' notie-auto-hide-disabled');
      notie.innerHTML = '\n    <div class="notie-body">\n      <span class="notie-svg">' + svgs[this.opts.type] + '</span>\n      <span class="notie-text">' + this.opts.text + '</span>\n    </div>\n    ';
      // append notie
      $('.noties').appendChild(notie);
      // show notie
      setTimeout(function () {
        notie.classList.add('notie-shown');
      }, 100);
      // store notie for tracking
      this.notie = notie;
      // autoHide notie
      if (this.opts.autoHide) {
        setTimeout(function () {
          _this.removeNotie();
        }, 3000);
      } else {
        notie.addEventListener('click', function () {
          _this.removeNotie(notie);
        });
        notie.querySelector('a').addEventListener('click', function (e) {
          e.stopPropagation();
        });
      }
    }
  }, {
    key: 'removeNotie',
    value: function removeNotie(notie) {
      notie = notie || this.notie;
      notie.classList.remove('notie-shown');
      setTimeout(function () {
        notie.remove();
      }, 200);
    }
  }]);

  return Notie;
})();

exports.default = function () {
  for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
    opts[_key] = arguments[_key];
  }

  return new Notie(opts);
};