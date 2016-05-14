module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _notie = __webpack_require__(5);

	var _notie2 = _interopRequireDefault(_notie);

	var _iconError = __webpack_require__(6);

	var _iconError2 = _interopRequireDefault(_iconError);

	var _iconSuccess = __webpack_require__(8);

	var _iconSuccess2 = _interopRequireDefault(_iconSuccess);

	var _iconWarning = __webpack_require__(9);

	var _iconWarning2 = _interopRequireDefault(_iconWarning);

	var _iconInfo = __webpack_require__(7);

	var _iconInfo2 = _interopRequireDefault(_iconInfo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var svgs = {
	  info: _iconInfo2.default, success: _iconSuccess2.default, warning: _iconWarning2.default, error: _iconError2.default
	};

	var $ = document.querySelector.bind(document);
	var $$ = document.querySelectorAll.bind(document);

	function domEach(els, fn) {
	  Array.prototype.forEach.call(els, fn);
	}

	var Notie = function () {
	  function Notie(text, opts) {
	    _classCallCheck(this, Notie);

	    this.text = text;
	    this.opts = opts;
	    this.events = {};
	    this.notify();
	  }

	  _createClass(Notie, [{
	    key: 'init',
	    value: function init() {
	      var noties = $('.noties-' + this.opts.position);
	      if (!noties) {
	        this.noties = document.createElement('div');
	        this.noties.className = 'noties noties-' + this.opts.position;
	        $('body').appendChild(this.noties);
	      } else {
	        this.noties = noties;
	      }
	    }
	  }, {
	    key: 'notify',
	    value: function notify() {
	      var _this = this;

	      this.init();
	      this.notie = document.createElement('div');
	      this.notie.className = 'notie notie-' + this.opts.type + (this.opts.autoHide ? '' : ' notie-auto-hide-disabled');
	      this.notie.innerHTML = '\n    <div class="notie-body">\n      <span class="notie-svg">' + svgs[this.opts.type] + '</span>\n      <span class="notie-text">' + this.text + '</span>\n    </div>\n    ';
	      // add new notie
	      var firstChild = this.noties.firstChild;
	      this.noties.insertBefore(this.notie, firstChild);

	      // show notie
	      setTimeout(function () {
	        _this.notie.classList.add('notie-shown');
	      }, 100);

	      // auto hide
	      if (this.opts.autoHide) {
	        this.startTimeout();
	      }

	      this.registerEvents();
	    }
	  }, {
	    key: 'registerEvents',
	    value: function registerEvents() {
	      var _this2 = this;

	      if (this.opts.autoHide) {
	        this.events.mouseover = function () {
	          clearTimeout(_this2.timeout);
	          _this2.timeout = null;
	        };
	        this.events.mouseleave = function () {
	          return _this2.startTimeout();
	        };
	        this.notie.addEventListener('mouseover', this.events.mouseover, false);
	        this.notie.addEventListener('mouseleave', this.events.mouseleave, false);
	      } else {
	        this.notie.addEventListener('click', function () {
	          return _this2.removeNotie();
	        });
	        domEach(this.notie.querySelectorAll('[notie-prevent]'), function (el) {
	          el.addEventListener('click', function (e) {
	            return e.stopPropagation();
	          }, false);
	        });
	      }
	    }
	  }, {
	    key: 'startTimeout',
	    value: function startTimeout() {
	      var _this3 = this;

	      var timeout = arguments.length <= 0 || arguments[0] === undefined ? this.opts.timeout : arguments[0];

	      this.timeout = setTimeout(function () {
	        _this3.removeNotie();
	      }, timeout);
	    }
	  }, {
	    key: 'removeNotie',
	    value: function removeNotie() {
	      var _this4 = this;

	      var notie = arguments.length <= 0 || arguments[0] === undefined ? this.notie : arguments[0];

	      notie.classList.remove('notie-shown');
	      setTimeout(function () {
	        _this4.noties.removeChild(notie);
	        notie = null;
	      }, 200);
	    }
	  }]);

	  return Notie;
	}();

	var notie = function notie() {
	  var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var _ref$position = _ref.position;
	  var position = _ref$position === undefined ? 'top-right' : _ref$position;
	  var _ref$type = _ref.type;
	  var type = _ref$type === undefined ? 'info' : _ref$type;
	  var _ref$autoHide = _ref.autoHide;
	  var autoHide = _ref$autoHide === undefined ? true : _ref$autoHide;
	  var _ref$timeout = _ref.timeout;
	  var timeout = _ref$timeout === undefined ? 3000 : _ref$timeout;

	  return new Notie(text, {
	    type: type,
	    position: position,
	    autoHide: autoHide,
	    timeout: timeout
	  });
	};

	exports.default = notie;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, ".noties {\n  position: fixed\n}\n\n.noties:empty {\n  display: none\n}\n\n.noties-top-right {\n  right: 0;\n  top: 20px\n}\n\n.noties-top-right .notie {\n  -ms-transform: translateX(100%);\n      transform: translateX(100%)\n}\n\n.noties-top-right .notie.notie-shown {\n  -ms-transform: translateX(-20px);\n      transform: translateX(-20px)\n}\n\n.noties-top-left {\n  left: 0;\n  top: 20px\n}\n\n.noties-top-left .notie {\n  -ms-transform: translateX(-100%);\n      transform: translateX(-100%)\n}\n\n.noties-top-left .notie.notie-shown {\n  -ms-transform: translateX(20px);\n      transform: translateX(20px)\n}\n\n.noties-bottom-right {\n  right: 0;\n  bottom: 20px\n}\n\n.noties-bottom-right .notie {\n  -ms-transform: translateX(100%);\n      transform: translateX(100%)\n}\n\n.noties-bottom-right .notie.notie-shown {\n  -ms-transform: translateX(-20px);\n      transform: translateX(-20px)\n}\n\n.noties-bottom-left {\n  left: 0;\n  bottom: 20px\n}\n\n.noties-bottom-left .notie {\n  -ms-transform: translateX(-100%);\n      transform: translateX(-100%)\n}\n\n.noties-bottom-left .notie.notie-shown {\n  -ms-transform: translateX(20px);\n      transform: translateX(20px)\n}\n\n.noties-top-center {\n  left: 50%;\n  -ms-transform: translateX(-50%);\n      transform: translateX(-50%);\n  top: 0\n}\n\n.noties-top-center .notie {\n  -ms-transform: translateY(-100%);\n      transform: translateY(-100%)\n}\n\n.noties-top-center .notie.notie-shown {\n  -ms-transform: translateY(20px);\n      transform: translateY(20px)\n}\n\n.noties-bottom-center {\n  left: 50%;\n  -ms-transform: translateX(-50%);\n      transform: translateX(-50%);\n  bottom: 0\n}\n\n.noties-bottom-center .notie {\n  -ms-transform: translateY(100%);\n      transform: translateY(100%)\n}\n\n.noties-bottom-center .notie.notie-shown {\n  -ms-transform: translateY(-20px);\n      transform: translateY(-20px)\n}\n\n.notie {\n  background-color: #ddd;\n  opacity: 0;\n  transition: transform .3s, opacity .3s;\n  border: 1px solid #ddd;\n  width: 200px;\n  max-width: 80%;\n  font: 14px/1.4 Helvetica, serif;\n  word-wrap: break-word\n}\n\n.notie:not(:last-child) {\n  margin-bottom: 10px\n}\n\n.notie.notie-auto-hide-disabled {\n  cursor: pointer\n}\n\n.notie.notie-shown {\n  opacity: 1\n}\n\n.notie .notie-body {\n  padding: 10px 12px\n}\n\n.notie .notie-svg {\n  height: 23px;\n  display: block;\n  float: left\n}\n\n.notie .notie-text {\n  display: block;\n  padding-left: 30px;\n  padding-top: 2px\n}\n\n.notie svg {\n  height: 23px;\n  width: 23px\n}\n\n.notie.notie-info {\n  background-color: #C6E4F4;\n  border-color: #A9D3EB;\n  color: #477DAC;\n\n  a {\n    color: #477DAC\n  }\n}\n\n.notie.notie-error {\n  background-color: #EAC1BD;\n  border-color: #D7A9A6;\n  color: #AB2925;\n\n  a {\n    color: #AB2925\n  }\n}\n\n.notie.notie-success {\n  background-color: #D9F1CF;\n  border-color: #C8E1BF;\n  color: #748C6C;\n\n  a {\n    color: #748C6C\n  }\n}\n\n.notie.notie-warning {\n  background-color: #F7F2CF;\n  border-color: #E8E2B2;\n  color: #9C7D45;\n\n  a {\n    color: #9C7D45\n  }\n}\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./notie.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./notie.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<svg fill=\"#AB2925\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0V0z\" fill=\"none\"></path><path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"></path></svg>"

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "<svg fill=\"#477DAC\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"></path><path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"></path></svg>"

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "<svg fill=\"#748C6C\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"></path><path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"></path></svg>"

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<svg fill=\"#9C7D45\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h24v24H0z\" fill=\"none\"></path><path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"></path></svg>"

/***/ }
/******/ ]);