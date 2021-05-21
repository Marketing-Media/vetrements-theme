(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/bootstrap/js/src/popover.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/bootstrap/js/src/tooltip.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.6.0): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'popover'
const VERSION = '4.6.0'
const DATA_KEY = 'bs.popover'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME]
const CLASS_PREFIX = 'bs-popover'
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g')

const Default = {
  ..._tooltip__WEBPACK_IMPORTED_MODULE_1__["default"].Default,
  placement: 'right',
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' +
              '<div class="arrow"></div>' +
              '<h3 class="popover-header"></h3>' +
              '<div class="popover-body"></div></div>'
}

const DefaultType = {
  ..._tooltip__WEBPACK_IMPORTED_MODULE_1__["default"].DefaultType,
  content: '(string|element|function)'
}

const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'

const SELECTOR_TITLE = '.popover-header'
const SELECTOR_CONTENT = '.popover-body'

const Event = {
  HIDE: `hide${EVENT_KEY}`,
  HIDDEN: `hidden${EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
  SHOWN: `shown${EVENT_KEY}`,
  INSERTED: `inserted${EVENT_KEY}`,
  CLICK: `click${EVENT_KEY}`,
  FOCUSIN: `focusin${EVENT_KEY}`,
  FOCUSOUT: `focusout${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Popover extends _tooltip__WEBPACK_IMPORTED_MODULE_1__["default"] {
  // Getters

  static get VERSION() {
    return VERSION
  }

  static get Default() {
    return Default
  }

  static get NAME() {
    return NAME
  }

  static get DATA_KEY() {
    return DATA_KEY
  }

  static get Event() {
    return Event
  }

  static get EVENT_KEY() {
    return EVENT_KEY
  }

  static get DefaultType() {
    return DefaultType
  }

  // Overrides

  isWithContent() {
    return this.getTitle() || this._getContent()
  }

  addAttachmentClass(attachment) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`)
  }

  getTipElement() {
    this.tip = this.tip || jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.config.template)[0]
    return this.tip
  }

  setContent() {
    const $tip = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.getTipElement())

    // We use append for html objects to maintain js events
    this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle())
    let content = this._getContent()
    if (typeof content === 'function') {
      content = content.call(this.element)
    }

    this.setElementContent($tip.find(SELECTOR_CONTENT), content)

    $tip.removeClass(`${CLASS_NAME_FADE} ${CLASS_NAME_SHOW}`)
  }

  // Private

  _getContent() {
    return this.element.getAttribute('data-content') ||
      this.config.content
  }

  _cleanTipClass() {
    const $tip = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this.getTipElement())
    const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX)
    if (tabClass !== null && tabClass.length > 0) {
      $tip.removeClass(tabClass.join(''))
    }
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
      const _config = typeof config === 'object' ? config : null

      if (!data && /dispose|hide/.test(config)) {
        return
      }

      if (!data) {
        data = new Popover(this, _config)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      }
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME] = Popover._jQueryInterface
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME].Constructor = Popover
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME].noConflict = () => {
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME] = JQUERY_NO_CONFLICT
  return Popover._jQueryInterface
}

/* harmony default export */ __webpack_exports__["default"] = (Popover);


/***/ }),

/***/ "./node_modules/bootstrap/js/src/tools/sanitizer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultWhitelist", function() { return DefaultWhitelist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitizeHtml", function() { return sanitizeHtml; });
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.6.0): tools/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const uriAttrs = [
  'background',
  'cite',
  'href',
  'itemtype',
  'longdesc',
  'poster',
  'src',
  'xlink:href'
]

const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i

const DefaultWhitelist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
}

/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */
const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi

/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */
const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i

function allowedAttribute(attr, allowedAttributeList) {
  const attrName = attr.nodeName.toLowerCase()

  if (allowedAttributeList.indexOf(attrName) !== -1) {
    if (uriAttrs.indexOf(attrName) !== -1) {
      return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
    }

    return true
  }

  const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp)

  // Check if a regular expression validates the attribute.
  for (let i = 0, len = regExp.length; i < len; i++) {
    if (attrName.match(regExp[i])) {
      return true
    }
  }

  return false
}

function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
  if (unsafeHtml.length === 0) {
    return unsafeHtml
  }

  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeHtml)
  }

  const domParser = new window.DOMParser()
  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html')
  const whitelistKeys = Object.keys(whiteList)
  const elements = [].slice.call(createdDocument.body.querySelectorAll('*'))

  for (let i = 0, len = elements.length; i < len; i++) {
    const el = elements[i]
    const elName = el.nodeName.toLowerCase()

    if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
      el.parentNode.removeChild(el)

      continue
    }

    const attributeList = [].slice.call(el.attributes)
    const whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || [])

    attributeList.forEach(attr => {
      if (!allowedAttribute(attr, whitelistedAttributes)) {
        el.removeAttribute(attr.nodeName)
      }
    })
  }

  return createdDocument.body.innerHTML
}


/***/ }),

/***/ "./node_modules/bootstrap/js/src/tooltip.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_sanitizer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/bootstrap/js/src/tools/sanitizer.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/bootstrap/js/src/util.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.6.0): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */






/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'tooltip'
const VERSION = '4.6.0'
const DATA_KEY = 'bs.tooltip'
const EVENT_KEY = `.${DATA_KEY}`
const JQUERY_NO_CONFLICT = jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn[NAME]
const CLASS_PREFIX = 'bs-tooltip'
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g')
const DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn']

const DefaultType = {
  animation: 'boolean',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string',
  delay: '(number|object)',
  html: 'boolean',
  selector: '(string|boolean)',
  placement: '(string|function)',
  offset: '(number|string|function)',
  container: '(string|element|boolean)',
  fallbackPlacement: '(string|array)',
  boundary: '(string|element)',
  customClass: '(string|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  whiteList: 'object',
  popperConfig: '(null|object)'
}

const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left'
}

const Default = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' +
                    '<div class="arrow"></div>' +
                    '<div class="tooltip-inner"></div></div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  selector: false,
  placement: 'top',
  offset: 0,
  container: false,
  fallbackPlacement: 'flip',
  boundary: 'scrollParent',
  customClass: '',
  sanitize: true,
  sanitizeFn: null,
  whiteList: _tools_sanitizer__WEBPACK_IMPORTED_MODULE_0__["DefaultWhitelist"],
  popperConfig: null
}

const HOVER_STATE_SHOW = 'show'
const HOVER_STATE_OUT = 'out'

const Event = {
  HIDE: `hide${EVENT_KEY}`,
  HIDDEN: `hidden${EVENT_KEY}`,
  SHOW: `show${EVENT_KEY}`,
  SHOWN: `shown${EVENT_KEY}`,
  INSERTED: `inserted${EVENT_KEY}`,
  CLICK: `click${EVENT_KEY}`,
  FOCUSIN: `focusin${EVENT_KEY}`,
  FOCUSOUT: `focusout${EVENT_KEY}`,
  MOUSEENTER: `mouseenter${EVENT_KEY}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY}`
}

const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'

const SELECTOR_TOOLTIP_INNER = '.tooltip-inner'
const SELECTOR_ARROW = '.arrow'

const TRIGGER_HOVER = 'hover'
const TRIGGER_FOCUS = 'focus'
const TRIGGER_CLICK = 'click'
const TRIGGER_MANUAL = 'manual'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Tooltip {
  constructor(element, config) {
    if (typeof popper_js__WEBPACK_IMPORTED_MODULE_2__["default"] === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)')
    }

    // private
    this._isEnabled = true
    this._timeout = 0
    this._hoverState = ''
    this._activeTrigger = {}
    this._popper = null

    // Protected
    this.element = element
    this.config = this._getConfig(config)
    this.tip = null

    this._setListeners()
  }

  // Getters

  static get VERSION() {
    return VERSION
  }

  static get Default() {
    return Default
  }

  static get NAME() {
    return NAME
  }

  static get DATA_KEY() {
    return DATA_KEY
  }

  static get Event() {
    return Event
  }

  static get EVENT_KEY() {
    return EVENT_KEY
  }

  static get DefaultType() {
    return DefaultType
  }

  // Public

  enable() {
    this._isEnabled = true
  }

  disable() {
    this._isEnabled = false
  }

  toggleEnabled() {
    this._isEnabled = !this._isEnabled
  }

  toggle(event) {
    if (!this._isEnabled) {
      return
    }

    if (event) {
      const dataKey = this.constructor.DATA_KEY
      let context = jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.currentTarget).data(dataKey)

      if (!context) {
        context = new this.constructor(
          event.currentTarget,
          this._getDelegateConfig()
        )
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.currentTarget).data(dataKey, context)
      }

      context._activeTrigger.click = !context._activeTrigger.click

      if (context._isWithActiveTrigger()) {
        context._enter(null, context)
      } else {
        context._leave(null, context)
      }
    } else {
      if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.getTipElement()).hasClass(CLASS_NAME_SHOW)) {
        this._leave(null, this)
        return
      }

      this._enter(null, this)
    }
  }

  dispose() {
    clearTimeout(this._timeout)

    jquery__WEBPACK_IMPORTED_MODULE_1___default.a.removeData(this.element, this.constructor.DATA_KEY)

    jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).off(this.constructor.EVENT_KEY)
    jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).closest('.modal').off('hide.bs.modal', this._hideModalHandler)

    if (this.tip) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.tip).remove()
    }

    this._isEnabled = null
    this._timeout = null
    this._hoverState = null
    this._activeTrigger = null
    if (this._popper) {
      this._popper.destroy()
    }

    this._popper = null
    this.element = null
    this.config = null
    this.tip = null
  }

  show() {
    if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).css('display') === 'none') {
      throw new Error('Please use show on visible elements')
    }

    const showEvent = jquery__WEBPACK_IMPORTED_MODULE_1___default.a.Event(this.constructor.Event.SHOW)
    if (this.isWithContent() && this._isEnabled) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).trigger(showEvent)

      const shadowRoot = _util__WEBPACK_IMPORTED_MODULE_3__["default"].findShadowRoot(this.element)
      const isInTheDom = jquery__WEBPACK_IMPORTED_MODULE_1___default.a.contains(
        shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement,
        this.element
      )

      if (showEvent.isDefaultPrevented() || !isInTheDom) {
        return
      }

      const tip = this.getTipElement()
      const tipId = _util__WEBPACK_IMPORTED_MODULE_3__["default"].getUID(this.constructor.NAME)

      tip.setAttribute('id', tipId)
      this.element.setAttribute('aria-describedby', tipId)

      this.setContent()

      if (this.config.animation) {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip).addClass(CLASS_NAME_FADE)
      }

      const placement = typeof this.config.placement === 'function' ?
        this.config.placement.call(this, tip, this.element) :
        this.config.placement

      const attachment = this._getAttachment(placement)
      this.addAttachmentClass(attachment)

      const container = this._getContainer()
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip).data(this.constructor.DATA_KEY, this)

      if (!jquery__WEBPACK_IMPORTED_MODULE_1___default.a.contains(this.element.ownerDocument.documentElement, this.tip)) {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip).appendTo(container)
      }

      jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).trigger(this.constructor.Event.INSERTED)

      this._popper = new popper_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.element, tip, this._getPopperConfig(attachment))

      jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip).addClass(CLASS_NAME_SHOW)
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip).addClass(this.config.customClass)

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(document.body).children().on('mouseover', null, jquery__WEBPACK_IMPORTED_MODULE_1___default.a.noop)
      }

      const complete = () => {
        if (this.config.animation) {
          this._fixTransition()
        }

        const prevHoverState = this._hoverState
        this._hoverState = null

        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).trigger(this.constructor.Event.SHOWN)

        if (prevHoverState === HOVER_STATE_OUT) {
          this._leave(null, this)
        }
      }

      if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.tip).hasClass(CLASS_NAME_FADE)) {
        const transitionDuration = _util__WEBPACK_IMPORTED_MODULE_3__["default"].getTransitionDurationFromElement(this.tip)

        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.tip)
          .one(_util__WEBPACK_IMPORTED_MODULE_3__["default"].TRANSITION_END, complete)
          .emulateTransitionEnd(transitionDuration)
      } else {
        complete()
      }
    }
  }

  hide(callback) {
    const tip = this.getTipElement()
    const hideEvent = jquery__WEBPACK_IMPORTED_MODULE_1___default.a.Event(this.constructor.Event.HIDE)
    const complete = () => {
      if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
        tip.parentNode.removeChild(tip)
      }

      this._cleanTipClass()
      this.element.removeAttribute('aria-describedby')
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).trigger(this.constructor.Event.HIDDEN)
      if (this._popper !== null) {
        this._popper.destroy()
      }

      if (callback) {
        callback()
      }
    }

    jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).trigger(hideEvent)

    if (hideEvent.isDefaultPrevented()) {
      return
    }

    jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip).removeClass(CLASS_NAME_SHOW)

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    if ('ontouchstart' in document.documentElement) {
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(document.body).children().off('mouseover', null, jquery__WEBPACK_IMPORTED_MODULE_1___default.a.noop)
    }

    this._activeTrigger[TRIGGER_CLICK] = false
    this._activeTrigger[TRIGGER_FOCUS] = false
    this._activeTrigger[TRIGGER_HOVER] = false

    if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.tip).hasClass(CLASS_NAME_FADE)) {
      const transitionDuration = _util__WEBPACK_IMPORTED_MODULE_3__["default"].getTransitionDurationFromElement(tip)

      jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip)
        .one(_util__WEBPACK_IMPORTED_MODULE_3__["default"].TRANSITION_END, complete)
        .emulateTransitionEnd(transitionDuration)
    } else {
      complete()
    }

    this._hoverState = ''
  }

  update() {
    if (this._popper !== null) {
      this._popper.scheduleUpdate()
    }
  }

  // Protected

  isWithContent() {
    return Boolean(this.getTitle())
  }

  addAttachmentClass(attachment) {
    jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.getTipElement()).addClass(`${CLASS_PREFIX}-${attachment}`)
  }

  getTipElement() {
    this.tip = this.tip || jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.config.template)[0]
    return this.tip
  }

  setContent() {
    const tip = this.getTipElement()
    this.setElementContent(jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle())
    jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip).removeClass(`${CLASS_NAME_FADE} ${CLASS_NAME_SHOW}`)
  }

  setElementContent($element, content) {
    if (typeof content === 'object' && (content.nodeType || content.jquery)) {
      // Content is a DOM node or a jQuery
      if (this.config.html) {
        if (!jquery__WEBPACK_IMPORTED_MODULE_1___default()(content).parent().is($element)) {
          $element.empty().append(content)
        }
      } else {
        $element.text(jquery__WEBPACK_IMPORTED_MODULE_1___default()(content).text())
      }

      return
    }

    if (this.config.html) {
      if (this.config.sanitize) {
        content = Object(_tools_sanitizer__WEBPACK_IMPORTED_MODULE_0__["sanitizeHtml"])(content, this.config.whiteList, this.config.sanitizeFn)
      }

      $element.html(content)
    } else {
      $element.text(content)
    }
  }

  getTitle() {
    let title = this.element.getAttribute('data-original-title')

    if (!title) {
      title = typeof this.config.title === 'function' ?
        this.config.title.call(this.element) :
        this.config.title
    }

    return title
  }

  // Private

  _getPopperConfig(attachment) {
    const defaultBsConfig = {
      placement: attachment,
      modifiers: {
        offset: this._getOffset(),
        flip: {
          behavior: this.config.fallbackPlacement
        },
        arrow: {
          element: SELECTOR_ARROW
        },
        preventOverflow: {
          boundariesElement: this.config.boundary
        }
      },
      onCreate: data => {
        if (data.originalPlacement !== data.placement) {
          this._handlePopperPlacementChange(data)
        }
      },
      onUpdate: data => this._handlePopperPlacementChange(data)
    }

    return {
      ...defaultBsConfig,
      ...this.config.popperConfig
    }
  }

  _getOffset() {
    const offset = {}

    if (typeof this.config.offset === 'function') {
      offset.fn = data => {
        data.offsets = {
          ...data.offsets,
          ...(this.config.offset(data.offsets, this.element) || {})
        }

        return data
      }
    } else {
      offset.offset = this.config.offset
    }

    return offset
  }

  _getContainer() {
    if (this.config.container === false) {
      return document.body
    }

    if (_util__WEBPACK_IMPORTED_MODULE_3__["default"].isElement(this.config.container)) {
      return jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.config.container)
    }

    return jquery__WEBPACK_IMPORTED_MODULE_1___default()(document).find(this.config.container)
  }

  _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()]
  }

  _setListeners() {
    const triggers = this.config.trigger.split(' ')

    triggers.forEach(trigger => {
      if (trigger === 'click') {
        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).on(
          this.constructor.Event.CLICK,
          this.config.selector,
          event => this.toggle(event)
        )
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ?
          this.constructor.Event.MOUSEENTER :
          this.constructor.Event.FOCUSIN
        const eventOut = trigger === TRIGGER_HOVER ?
          this.constructor.Event.MOUSELEAVE :
          this.constructor.Event.FOCUSOUT

        jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element)
          .on(eventIn, this.config.selector, event => this._enter(event))
          .on(eventOut, this.config.selector, event => this._leave(event))
      }
    })

    this._hideModalHandler = () => {
      if (this.element) {
        this.hide()
      }
    }

    jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).closest('.modal').on('hide.bs.modal', this._hideModalHandler)

    if (this.config.selector) {
      this.config = {
        ...this.config,
        trigger: 'manual',
        selector: ''
      }
    } else {
      this._fixTitle()
    }
  }

  _fixTitle() {
    const titleType = typeof this.element.getAttribute('data-original-title')

    if (this.element.getAttribute('title') || titleType !== 'string') {
      this.element.setAttribute(
        'data-original-title',
        this.element.getAttribute('title') || ''
      )

      this.element.setAttribute('title', '')
    }
  }

  _enter(event, context) {
    const dataKey = this.constructor.DATA_KEY
    context = context || jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.currentTarget).data(dataKey)

    if (!context) {
      context = new this.constructor(
        event.currentTarget,
        this._getDelegateConfig()
      )
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.currentTarget).data(dataKey, context)
    }

    if (event) {
      context._activeTrigger[
        event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER
      ] = true
    }

    if (jquery__WEBPACK_IMPORTED_MODULE_1___default()(context.getTipElement()).hasClass(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
      context._hoverState = HOVER_STATE_SHOW
      return
    }

    clearTimeout(context._timeout)

    context._hoverState = HOVER_STATE_SHOW

    if (!context.config.delay || !context.config.delay.show) {
      context.show()
      return
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_SHOW) {
        context.show()
      }
    }, context.config.delay.show)
  }

  _leave(event, context) {
    const dataKey = this.constructor.DATA_KEY
    context = context || jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.currentTarget).data(dataKey)

    if (!context) {
      context = new this.constructor(
        event.currentTarget,
        this._getDelegateConfig()
      )
      jquery__WEBPACK_IMPORTED_MODULE_1___default()(event.currentTarget).data(dataKey, context)
    }

    if (event) {
      context._activeTrigger[
        event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER
      ] = false
    }

    if (context._isWithActiveTrigger()) {
      return
    }

    clearTimeout(context._timeout)

    context._hoverState = HOVER_STATE_OUT

    if (!context.config.delay || !context.config.delay.hide) {
      context.hide()
      return
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_OUT) {
        context.hide()
      }
    }, context.config.delay.hide)
  }

  _isWithActiveTrigger() {
    for (const trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true
      }
    }

    return false
  }

  _getConfig(config) {
    const dataAttributes = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.element).data()

    Object.keys(dataAttributes)
      .forEach(dataAttr => {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr]
        }
      })

    config = {
      ...this.constructor.Default,
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    }

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      }
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString()
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString()
    }

    _util__WEBPACK_IMPORTED_MODULE_3__["default"].typeCheckConfig(
      NAME,
      config,
      this.constructor.DefaultType
    )

    if (config.sanitize) {
      config.template = Object(_tools_sanitizer__WEBPACK_IMPORTED_MODULE_0__["sanitizeHtml"])(config.template, config.whiteList, config.sanitizeFn)
    }

    return config
  }

  _getDelegateConfig() {
    const config = {}

    if (this.config) {
      for (const key in this.config) {
        if (this.constructor.Default[key] !== this.config[key]) {
          config[key] = this.config[key]
        }
      }
    }

    return config
  }

  _cleanTipClass() {
    const $tip = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.getTipElement())
    const tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX)
    if (tabClass !== null && tabClass.length) {
      $tip.removeClass(tabClass.join(''))
    }
  }

  _handlePopperPlacementChange(popperData) {
    this.tip = popperData.instance.popper
    this._cleanTipClass()
    this.addAttachmentClass(this._getAttachment(popperData.placement))
  }

  _fixTransition() {
    const tip = this.getTipElement()
    const initConfigAnimation = this.config.animation

    if (tip.getAttribute('x-placement') !== null) {
      return
    }

    jquery__WEBPACK_IMPORTED_MODULE_1___default()(tip).removeClass(CLASS_NAME_FADE)
    this.config.animation = false
    this.hide()
    this.show()
    this.config.animation = initConfigAnimation
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      const $element = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this)
      let data = $element.data(DATA_KEY)
      const _config = typeof config === 'object' && config

      if (!data && /dispose|hide/.test(config)) {
        return
      }

      if (!data) {
        data = new Tooltip(this, _config)
        $element.data(DATA_KEY, data)
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      }
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn[NAME] = Tooltip._jQueryInterface
jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn[NAME].Constructor = Tooltip
jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn[NAME].noConflict = () => {
  jquery__WEBPACK_IMPORTED_MODULE_1___default.a.fn[NAME] = JQUERY_NO_CONFLICT
  return Tooltip._jQueryInterface
}

/* harmony default export */ __webpack_exports__["default"] = (Tooltip);


/***/ })

}]);
//# sourceMappingURL=1.js.map