(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/bootstrap/js/src/modal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/bootstrap/js/src/util.js");
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.6.0): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */




/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'modal'
const VERSION = '4.6.0'
const DATA_KEY = 'bs.modal'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const JQUERY_NO_CONFLICT = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME]
const ESCAPE_KEYCODE = 27 // KeyboardEvent.which value for Escape (Esc) key

const Default = {
  backdrop: true,
  keyboard: true,
  focus: true,
  show: true
}

const DefaultType = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean',
  show: 'boolean'
}

const EVENT_HIDE = `hide${EVENT_KEY}`
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`
const EVENT_HIDDEN = `hidden${EVENT_KEY}`
const EVENT_SHOW = `show${EVENT_KEY}`
const EVENT_SHOWN = `shown${EVENT_KEY}`
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`
const EVENT_RESIZE = `resize${EVENT_KEY}`
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY}`
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_SCROLLABLE = 'modal-dialog-scrollable'
const CLASS_NAME_SCROLLBAR_MEASURER = 'modal-scrollbar-measure'
const CLASS_NAME_BACKDROP = 'modal-backdrop'
const CLASS_NAME_OPEN = 'modal-open'
const CLASS_NAME_FADE = 'fade'
const CLASS_NAME_SHOW = 'show'
const CLASS_NAME_STATIC = 'modal-static'

const SELECTOR_DIALOG = '.modal-dialog'
const SELECTOR_MODAL_BODY = '.modal-body'
const SELECTOR_DATA_TOGGLE = '[data-toggle="modal"]'
const SELECTOR_DATA_DISMISS = '[data-dismiss="modal"]'
const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
const SELECTOR_STICKY_CONTENT = '.sticky-top'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Modal {
  constructor(element, config) {
    this._config = this._getConfig(config)
    this._element = element
    this._dialog = element.querySelector(SELECTOR_DIALOG)
    this._backdrop = null
    this._isShown = false
    this._isBodyOverflowing = false
    this._ignoreBackdropClick = false
    this._isTransitioning = false
    this._scrollbarWidth = 0
  }

  // Getters

  static get VERSION() {
    return VERSION
  }

  static get Default() {
    return Default
  }

  // Public

  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget)
  }

  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return
    }

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).hasClass(CLASS_NAME_FADE)) {
      this._isTransitioning = true
    }

    const showEvent = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event(EVENT_SHOW, {
      relatedTarget
    })

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(showEvent)

    if (this._isShown || showEvent.isDefaultPrevented()) {
      return
    }

    this._isShown = true

    this._checkScrollbar()
    this._setScrollbar()

    this._adjustDialog()

    this._setEscapeEvent()
    this._setResizeEvent()

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).on(
      EVENT_CLICK_DISMISS,
      SELECTOR_DATA_DISMISS,
      event => this.hide(event)
    )

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._dialog).on(EVENT_MOUSEDOWN_DISMISS, () => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).one(EVENT_MOUSEUP_DISMISS, event => {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).is(this._element)) {
          this._ignoreBackdropClick = true
        }
      })
    })

    this._showBackdrop(() => this._showElement(relatedTarget))
  }

  hide(event) {
    if (event) {
      event.preventDefault()
    }

    if (!this._isShown || this._isTransitioning) {
      return
    }

    const hideEvent = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event(EVENT_HIDE)

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(hideEvent)

    if (!this._isShown || hideEvent.isDefaultPrevented()) {
      return
    }

    this._isShown = false
    const transition = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).hasClass(CLASS_NAME_FADE)

    if (transition) {
      this._isTransitioning = true
    }

    this._setEscapeEvent()
    this._setResizeEvent()

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off(EVENT_FOCUSIN)

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).removeClass(CLASS_NAME_SHOW)

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).off(EVENT_CLICK_DISMISS)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._dialog).off(EVENT_MOUSEDOWN_DISMISS)

    if (transition) {
      const transitionDuration = _util__WEBPACK_IMPORTED_MODULE_1__["default"].getTransitionDurationFromElement(this._element)

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element)
        .one(_util__WEBPACK_IMPORTED_MODULE_1__["default"].TRANSITION_END, event => this._hideModal(event))
        .emulateTransitionEnd(transitionDuration)
    } else {
      this._hideModal()
    }
  }

  dispose() {
    [window, this._element, this._dialog]
      .forEach(htmlElement => jquery__WEBPACK_IMPORTED_MODULE_0___default()(htmlElement).off(EVENT_KEY))

    /**
     * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
     * Do not move `document` in `htmlElements` array
     * It will remove `EVENT_CLICK_DATA_API` event that should remain
     */
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).off(EVENT_FOCUSIN)

    jquery__WEBPACK_IMPORTED_MODULE_0___default.a.removeData(this._element, DATA_KEY)

    this._config = null
    this._element = null
    this._dialog = null
    this._backdrop = null
    this._isShown = null
    this._isBodyOverflowing = null
    this._ignoreBackdropClick = null
    this._isTransitioning = null
    this._scrollbarWidth = null
  }

  handleUpdate() {
    this._adjustDialog()
  }

  // Private

  _getConfig(config) {
    config = {
      ...Default,
      ...config
    }
    _util__WEBPACK_IMPORTED_MODULE_1__["default"].typeCheckConfig(NAME, config, DefaultType)
    return config
  }

  _triggerBackdropTransition() {
    const hideEventPrevented = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event(EVENT_HIDE_PREVENTED)

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(hideEventPrevented)
    if (hideEventPrevented.isDefaultPrevented()) {
      return
    }

    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight

    if (!isModalOverflowing) {
      this._element.style.overflowY = 'hidden'
    }

    this._element.classList.add(CLASS_NAME_STATIC)

    const modalTransitionDuration = _util__WEBPACK_IMPORTED_MODULE_1__["default"].getTransitionDurationFromElement(this._dialog)
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).off(_util__WEBPACK_IMPORTED_MODULE_1__["default"].TRANSITION_END)

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).one(_util__WEBPACK_IMPORTED_MODULE_1__["default"].TRANSITION_END, () => {
      this._element.classList.remove(CLASS_NAME_STATIC)
      if (!isModalOverflowing) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).one(_util__WEBPACK_IMPORTED_MODULE_1__["default"].TRANSITION_END, () => {
          this._element.style.overflowY = ''
        })
          .emulateTransitionEnd(this._element, modalTransitionDuration)
      }
    })
      .emulateTransitionEnd(modalTransitionDuration)
    this._element.focus()
  }

  _showElement(relatedTarget) {
    const transition = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).hasClass(CLASS_NAME_FADE)
    const modalBody = this._dialog ? this._dialog.querySelector(SELECTOR_MODAL_BODY) : null

    if (!this._element.parentNode ||
        this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      // Don't move modal's DOM position
      document.body.appendChild(this._element)
    }

    this._element.style.display = 'block'
    this._element.removeAttribute('aria-hidden')
    this._element.setAttribute('aria-modal', true)
    this._element.setAttribute('role', 'dialog')

    if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._dialog).hasClass(CLASS_NAME_SCROLLABLE) && modalBody) {
      modalBody.scrollTop = 0
    } else {
      this._element.scrollTop = 0
    }

    if (transition) {
      _util__WEBPACK_IMPORTED_MODULE_1__["default"].reflow(this._element)
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).addClass(CLASS_NAME_SHOW)

    if (this._config.focus) {
      this._enforceFocus()
    }

    const shownEvent = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.Event(EVENT_SHOWN, {
      relatedTarget
    })

    const transitionComplete = () => {
      if (this._config.focus) {
        this._element.focus()
      }

      this._isTransitioning = false
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(shownEvent)
    }

    if (transition) {
      const transitionDuration = _util__WEBPACK_IMPORTED_MODULE_1__["default"].getTransitionDurationFromElement(this._dialog)

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._dialog)
        .one(_util__WEBPACK_IMPORTED_MODULE_1__["default"].TRANSITION_END, transitionComplete)
        .emulateTransitionEnd(transitionDuration)
    } else {
      transitionComplete()
    }
  }

  _enforceFocus() {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document)
      .off(EVENT_FOCUSIN) // Guard against infinite focus loop
      .on(EVENT_FOCUSIN, event => {
        if (document !== event.target &&
            this._element !== event.target &&
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).has(event.target).length === 0) {
          this._element.focus()
        }
      })
  }

  _setEscapeEvent() {
    if (this._isShown) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).on(EVENT_KEYDOWN_DISMISS, event => {
        if (this._config.keyboard && event.which === ESCAPE_KEYCODE) {
          event.preventDefault()
          this.hide()
        } else if (!this._config.keyboard && event.which === ESCAPE_KEYCODE) {
          this._triggerBackdropTransition()
        }
      })
    } else if (!this._isShown) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).off(EVENT_KEYDOWN_DISMISS)
    }
  }

  _setResizeEvent() {
    if (this._isShown) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on(EVENT_RESIZE, event => this.handleUpdate(event))
    } else {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(EVENT_RESIZE)
    }
  }

  _hideModal() {
    this._element.style.display = 'none'
    this._element.setAttribute('aria-hidden', true)
    this._element.removeAttribute('aria-modal')
    this._element.removeAttribute('role')
    this._isTransitioning = false
    this._showBackdrop(() => {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).removeClass(CLASS_NAME_OPEN)
      this._resetAdjustments()
      this._resetScrollbar()
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).trigger(EVENT_HIDDEN)
    })
  }

  _removeBackdrop() {
    if (this._backdrop) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._backdrop).remove()
      this._backdrop = null
    }
  }

  _showBackdrop(callback) {
    const animate = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).hasClass(CLASS_NAME_FADE) ?
      CLASS_NAME_FADE : ''

    if (this._isShown && this._config.backdrop) {
      this._backdrop = document.createElement('div')
      this._backdrop.className = CLASS_NAME_BACKDROP

      if (animate) {
        this._backdrop.classList.add(animate)
      }

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._backdrop).appendTo(document.body)

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).on(EVENT_CLICK_DISMISS, event => {
        if (this._ignoreBackdropClick) {
          this._ignoreBackdropClick = false
          return
        }

        if (event.target !== event.currentTarget) {
          return
        }

        if (this._config.backdrop === 'static') {
          this._triggerBackdropTransition()
        } else {
          this.hide()
        }
      })

      if (animate) {
        _util__WEBPACK_IMPORTED_MODULE_1__["default"].reflow(this._backdrop)
      }

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._backdrop).addClass(CLASS_NAME_SHOW)

      if (!callback) {
        return
      }

      if (!animate) {
        callback()
        return
      }

      const backdropTransitionDuration = _util__WEBPACK_IMPORTED_MODULE_1__["default"].getTransitionDurationFromElement(this._backdrop)

      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._backdrop)
        .one(_util__WEBPACK_IMPORTED_MODULE_1__["default"].TRANSITION_END, callback)
        .emulateTransitionEnd(backdropTransitionDuration)
    } else if (!this._isShown && this._backdrop) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._backdrop).removeClass(CLASS_NAME_SHOW)

      const callbackRemove = () => {
        this._removeBackdrop()
        if (callback) {
          callback()
        }
      }

      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._element).hasClass(CLASS_NAME_FADE)) {
        const backdropTransitionDuration = _util__WEBPACK_IMPORTED_MODULE_1__["default"].getTransitionDurationFromElement(this._backdrop)

        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this._backdrop)
          .one(_util__WEBPACK_IMPORTED_MODULE_1__["default"].TRANSITION_END, callbackRemove)
          .emulateTransitionEnd(backdropTransitionDuration)
      } else {
        callbackRemove()
      }
    } else if (callback) {
      callback()
    }
  }

  // ----------------------------------------------------------------------
  // the following methods are used to handle overflowing modals
  // todo (fat): these should probably be refactored out of modal.js
  // ----------------------------------------------------------------------

  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight

    if (!this._isBodyOverflowing && isModalOverflowing) {
      this._element.style.paddingLeft = `${this._scrollbarWidth}px`
    }

    if (this._isBodyOverflowing && !isModalOverflowing) {
      this._element.style.paddingRight = `${this._scrollbarWidth}px`
    }
  }

  _resetAdjustments() {
    this._element.style.paddingLeft = ''
    this._element.style.paddingRight = ''
  }

  _checkScrollbar() {
    const rect = document.body.getBoundingClientRect()
    this._isBodyOverflowing = Math.round(rect.left + rect.right) < window.innerWidth
    this._scrollbarWidth = this._getScrollbarWidth()
  }

  _setScrollbar() {
    if (this._isBodyOverflowing) {
      // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
      //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
      const fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT))
      const stickyContent = [].slice.call(document.querySelectorAll(SELECTOR_STICKY_CONTENT))

      // Adjust fixed content padding
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(fixedContent).each((index, element) => {
        const actualPadding = element.style.paddingRight
        const calculatedPadding = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('padding-right')
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(element)
          .data('padding-right', actualPadding)
          .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`)
      })

      // Adjust sticky content margin
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(stickyContent).each((index, element) => {
        const actualMargin = element.style.marginRight
        const calculatedMargin = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('margin-right')
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(element)
          .data('margin-right', actualMargin)
          .css('margin-right', `${parseFloat(calculatedMargin) - this._scrollbarWidth}px`)
      })

      // Adjust body padding
      const actualPadding = document.body.style.paddingRight
      const calculatedPadding = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).css('padding-right')
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body)
        .data('padding-right', actualPadding)
        .css('padding-right', `${parseFloat(calculatedPadding) + this._scrollbarWidth}px`)
    }

    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).addClass(CLASS_NAME_OPEN)
  }

  _resetScrollbar() {
    // Restore fixed content padding
    const fixedContent = [].slice.call(document.querySelectorAll(SELECTOR_FIXED_CONTENT))
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(fixedContent).each((index, element) => {
      const padding = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).data('padding-right')
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).removeData('padding-right')
      element.style.paddingRight = padding ? padding : ''
    })

    // Restore sticky content
    const elements = [].slice.call(document.querySelectorAll(`${SELECTOR_STICKY_CONTENT}`))
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(elements).each((index, element) => {
      const margin = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).data('margin-right')
      if (typeof margin !== 'undefined') {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('margin-right', margin).removeData('margin-right')
      }
    })

    // Restore body padding
    const padding = jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).data('padding-right')
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(document.body).removeData('padding-right')
    document.body.style.paddingRight = padding ? padding : ''
  }

  _getScrollbarWidth() { // thx d.walsh
    const scrollDiv = document.createElement('div')
    scrollDiv.className = CLASS_NAME_SCROLLBAR_MEASURER
    document.body.appendChild(scrollDiv)
    const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
  }

  // Static

  static _jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      let data = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY)
      const _config = {
        ...Default,
        ...jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(),
        ...(typeof config === 'object' && config ? config : {})
      }

      if (!data) {
        data = new Modal(this, _config)
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data(DATA_KEY, data)
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config](relatedTarget)
      } else if (_config.show) {
        data.show(relatedTarget)
      }
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  let target
  const selector = _util__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectorFromElement(this)

  if (selector) {
    target = document.querySelector(selector)
  }

  const config = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).data(DATA_KEY) ?
    'toggle' : {
      ...jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).data(),
      ...jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).data()
    }

  if (this.tagName === 'A' || this.tagName === 'AREA') {
    event.preventDefault()
  }

  const $target = jquery__WEBPACK_IMPORTED_MODULE_0___default()(target).one(EVENT_SHOW, showEvent => {
    if (showEvent.isDefaultPrevented()) {
      // Only register focus restorer if modal will actually get shown
      return
    }

    $target.one(EVENT_HIDDEN, () => {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is(':visible')) {
        this.focus()
      }
    })
  })

  Modal._jQueryInterface.call(jquery__WEBPACK_IMPORTED_MODULE_0___default()(target), config, this)
})

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME] = Modal._jQueryInterface
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME].Constructor = Modal
jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME].noConflict = () => {
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn[NAME] = JQUERY_NO_CONFLICT
  return Modal._jQueryInterface
}

/* harmony default export */ __webpack_exports__["default"] = (Modal);


/***/ }),

/***/ "./node_modules/bootstrap/js/src/util.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.6.0): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */



/**
 * ------------------------------------------------------------------------
 * Private TransitionEnd Helpers
 * ------------------------------------------------------------------------
 */

const TRANSITION_END = 'transitionend'
const MAX_UID = 1000000
const MILLISECONDS_MULTIPLIER = 1000

// Shoutout AngusCroll (https://goo.gl/pxwQGp)
function toType(obj) {
  if (obj === null || typeof obj === 'undefined') {
    return `${obj}`
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
}

function getSpecialTransitionEndEvent() {
  return {
    bindType: TRANSITION_END,
    delegateType: TRANSITION_END,
    handle(event) {
      if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(event.target).is(this)) {
        return event.handleObj.handler.apply(this, arguments) // eslint-disable-line prefer-rest-params
      }

      return undefined
    }
  }
}

function transitionEndEmulator(duration) {
  let called = false

  jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).one(Util.TRANSITION_END, () => {
    called = true
  })

  setTimeout(() => {
    if (!called) {
      Util.triggerTransitionEnd(this)
    }
  }, duration)

  return this
}

function setTransitionEndSupport() {
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.emulateTransitionEnd = transitionEndEmulator
  jquery__WEBPACK_IMPORTED_MODULE_0___default.a.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent()
}

/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */

const Util = {
  TRANSITION_END: 'bsTransitionEnd',

  getUID(prefix) {
    do {
      prefix += ~~(Math.random() * MAX_UID) // "~~" acts like a faster Math.floor() here
    } while (document.getElementById(prefix))

    return prefix
  },

  getSelectorFromElement(element) {
    let selector = element.getAttribute('data-target')

    if (!selector || selector === '#') {
      const hrefAttr = element.getAttribute('href')
      selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : ''
    }

    try {
      return document.querySelector(selector) ? selector : null
    } catch (_) {
      return null
    }
  },

  getTransitionDurationFromElement(element) {
    if (!element) {
      return 0
    }

    // Get transition-duration of the element
    let transitionDuration = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('transition-duration')
    let transitionDelay = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).css('transition-delay')

    const floatTransitionDuration = parseFloat(transitionDuration)
    const floatTransitionDelay = parseFloat(transitionDelay)

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0]
    transitionDelay = transitionDelay.split(',')[0]

    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER
  },

  reflow(element) {
    return element.offsetHeight
  },

  triggerTransitionEnd(element) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(element).trigger(TRANSITION_END)
  },

  supportsTransitionEnd() {
    return Boolean(TRANSITION_END)
  },

  isElement(obj) {
    return (obj[0] || obj).nodeType
  },

  typeCheckConfig(componentName, config, configTypes) {
    for (const property in configTypes) {
      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
        const expectedTypes = configTypes[property]
        const value = config[property]
        const valueType = value && Util.isElement(value) ?
          'element' : toType(value)

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new Error(
            `${componentName.toUpperCase()}: ` +
            `Option "${property}" provided type "${valueType}" ` +
            `but expected type "${expectedTypes}".`)
        }
      }
    }
  },

  findShadowRoot(element) {
    if (!document.documentElement.attachShadow) {
      return null
    }

    // Can find the shadow root otherwise it'll return the document
    if (typeof element.getRootNode === 'function') {
      const root = element.getRootNode()
      return root instanceof ShadowRoot ? root : null
    }

    if (element instanceof ShadowRoot) {
      return element
    }

    // when we don't find a shadow root
    if (!element.parentNode) {
      return null
    }

    return Util.findShadowRoot(element.parentNode)
  },

  jQueryDetection() {
    if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default.a === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
    }

    const version = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.fn.jquery.split(' ')[0].split('.')
    const minMajor = 1
    const ltMajor = 2
    const minMinor = 9
    const minPatch = 1
    const maxMajor = 4

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
    }
  }
}

Util.jQueryDetection()
setTransitionEndSupport()

/* harmony default export */ __webpack_exports__["default"] = (Util);


/***/ })

}]);
//# sourceMappingURL=3.js.map