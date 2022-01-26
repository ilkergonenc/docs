(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global.bend = {}, global.jQuery));
}(this, (function (exports, $) { 'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.5.0): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return "" + obj;
    }

    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined;
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    },
    jQueryDetection: function jQueryDetection() {
      if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
      }

      var version = $.fn.jquery.split(' ')[0].split('.');
      var minMajor = 1;
      var ltMajor = 2;
      var minMinor = 9;
      var minPatch = 1;
      var maxMajor = 4;

      if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
      }
    }
  };
  Util.jQueryDetection();
  setTransitionEndSupport();

  var NAME = 'drawer';
  var VERSION = '0.0.1';
  var DATA_KEY = 'bend.drawer';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ClassName = {
    BUTTON: 'btn',
    OPEN: 'open',
    SHOW: 'show',
    OVERFLOWHIDDEN: 'overflow-hidden'
  };
  var Selector = {
    DATA_TOGGLE: '[data-bend="drawer"]',
    BUTTON: '.btn',
    BACKDROP: '.drawer-backdrop',
    BODY: 'body'
  };
  var Event = {
    OPEN: "open" + EVENT_KEY,
    OPENED: "opened" + EVENT_KEY,
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var Default = {
    direction: 'left',
    slideType: 'over',
    closeOnClick: true
  };
  var DefaultType = {
    direction: 'string',
    slideType: 'string',
    closeOnClick: 'boolean'
  };

  var Drawer = /*#__PURE__*/function () {
    function Drawer(element, config) {
      this._element = element;
      this.$element = $(this._element);
      this._config = this._getConfig(config, element);
      this.init.call(this);
    }

    var _proto = Drawer.prototype;

    _proto.init = function init() {
      this.targetElement = this.$element.data('target');
      this.drawerBackdrop = "<div class=\"drawer-backdrop\" data-target=\"" + this.targetElement + "\"></div>";
      this.currentBackdrop = "div[data-target|=\"" + this.targetElement + "\"]";

      if (!this._checkBackdropExists.call(this)) {
        $(Selector.BODY).append(this.drawerBackdrop);
      }
    };

    _proto.open = function open() {
      this.$element.trigger(Event.OPEN);
      $(this.targetElement).addClass(ClassName.OPEN);
      $(this.currentBackdrop).addClass(ClassName.SHOW);
      $(Selector.BODY).addClass(ClassName.OVERFLOWHIDDEN);
      this.$element.trigger(Event.OPENED);
    };

    _proto.close = function close() {
      this.$element.trigger(Event.CLOSE);
      $(this.targetElement).removeClass(ClassName.OPEN);
      $(this.currentBackdrop).removeClass(ClassName.SHOW);
      $(Selector.BODY).removeClass(ClassName.OVERFLOWHIDDEN);
      this.$element.trigger(Event.CLOSED);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    _proto._checkBackdropExists = function _checkBackdropExists() {
      if ($(this.currentBackdrop).length) {
        return true;
      } else {
        return false;
      }
    };

    _proto._getConfig = function _getConfig(config, element) {
      config = _objectSpread2({}, this.constructor.Default, {}, $(element).data(), {}, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Drawer._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Drawer(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Drawer, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return Default;
      }
    }]);

    return Drawer;
  }();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Drawer._jQueryInterface.call($(button), 'open');
  }).on(Event.CLICK_DATA_API, Selector.BACKDROP, function (event) {
    event.preventDefault();

    Drawer._jQueryInterface.call($(event.target), 'close');
  });
  $.fn[NAME] = Drawer._jQueryInterface;
  $.fn[NAME].Constructor = Drawer;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Drawer._jQueryInterface;
  };

  var NAME$1 = 'togglePassword';
  var VERSION$1 = '0.0.1';
  var DATA_KEY$1 = 'bend.togglePassword';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    BUTTON: 'btn'
  };
  var Selector$1 = {
    DATA_TOGGLE: '[data-bend-toggle="password"]',
    BUTTON: '.btn'
  };
  var Event$1 = {
    HIDE: "hide" + EVENT_KEY$1,
    HIDDEN: "hidden" + EVENT_KEY$1,
    SHOW: "show" + EVENT_KEY$1,
    SHOWN: "shown" + EVENT_KEY$1,
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1
  };
  var InputTypes = {
    TEXT: 'text',
    PASSWORD: 'password'
  };
  var Default$1 = {
    iconHidden: '<i class="far fa-eye-slash"></i>',
    // iconHidden          : 'Show',
    iconShown: '<i class="far fa-eye"></i>',
    // iconShown           : 'Hide',
    tooltip: true,
    tooltipHiddenTitle: 'Show password',
    tooltipShownTitle: 'Hide password'
  };

  var TogglePassword = /*#__PURE__*/function () {
    function TogglePassword(element, config) {
      this._element = element;
      this.$element = $(this._element);
      this._config = this._getConfig(config);
      this.init.call(this);
    }

    var _proto = TogglePassword.prototype;

    _proto.init = function init() {
      this.passwordInput = this._getTargetElement.call(this);

      this._appendButtonIcon(this._config.iconHidden);

      this._initiateTooltip.call(this);
    };

    _proto.toggle = function toggle() {
      var inputType = this.passwordInput.attr('type');

      if (inputType === InputTypes.PASSWORD) {
        this.show();
      } else if (inputType === InputTypes.TEXT) {
        this.hide();
      }
    };

    _proto.show = function show() {
      this.$element.trigger(Event$1.SHOW);

      this._toggleTargetInputType(InputTypes.TEXT);

      this._appendButtonIcon(this._config.iconShown);

      if (this._config.tooltip === true) {
        this._updateTooltip(this._config.tooltipShownTitle);
      }

      this.$element.trigger(Event$1.SHOWN);
    };

    _proto.hide = function hide() {
      this.$element.trigger(Event$1.HIDE);

      this._toggleTargetInputType(InputTypes.PASSWORD);

      this._appendButtonIcon(this._config.iconHidden);

      if (this._config.tooltip === true) {
        this._updateTooltip(this._config.tooltipHiddenTitle);
      }

      this.$element.trigger(Event$1.HIDDEN);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    };

    _proto._toggleTargetInputType = function _toggleTargetInputType(type) {
      this.passwordInput.attr('type', type);
    };

    _proto._appendButtonIcon = function _appendButtonIcon(icon) {
      this.$element.html('').append(icon);
    };

    _proto._initiateTooltip = function _initiateTooltip() {
      if (this._config.tooltip === true) {
        this.$element.tooltip({
          title: this._config.tooltipHiddenTitle
        });
      }
    };

    _proto._updateTooltip = function _updateTooltip(title) {
      this.$element.tooltip('hide').attr('data-original-title', title).tooltip('update');

      if (this.$element.is(':hover, :focus')) {
        this.$element.tooltip('show');
      }
    };

    _proto._getTargetElement = function _getTargetElement() {
      var dataTarget = this.$element.data('bend-target');
      return $(dataTarget);
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread2({}, this.constructor.Default, {}, $(this._element).data(), {}, config);
      return config;
    };

    TogglePassword._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new TogglePassword(this, _config);
          $(this).data(DATA_KEY$1, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(TogglePassword, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return TogglePassword;
  }();

  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON);
    }

    TogglePassword._jQueryInterface.call($(button), 'toggle');
  });
  $.fn[NAME$1] = TogglePassword._jQueryInterface;
  $.fn[NAME$1].Constructor = TogglePassword;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return TogglePassword._jQueryInterface;
  };

  // Colored Tooltips
  //------------------------

  function tooltipColored() {

    $('[data-toggle="tooltip"]').each(function () {
      var tooltipColor = $(this).data('color'),
          tooltipClass,
          tooltipTemplate;

      if (tooltipColor) {
        tooltipClass = "tooltip-" + tooltipColor;
        tooltipTemplate = "<div class='tooltip " + tooltipClass + "' role='tooltip'><div class='arrow'></div><div class='tooltip-inner'></div></div>";
        $(this).tooltip({
          template: tooltipTemplate
        });
      }
    });
  }

  // Colored popovers
  //------------------------

  function popoverColored() {

    $('[data-toggle="popover"]').each(function () {
      var popoverColor = $(this).data('color'),
          popoverClass,
          popoverTemplate;

      if (popoverColor) {
        popoverClass = "popover-" + popoverColor;
        popoverTemplate = "<div class=\"popover " + popoverClass + "\" role=\"tooltip\"><div class=\"arrow\"></div><h3 class=\"popover-header\"></h3><div class=\"popover-body\"></div></div>";
        $(this).popover({
          template: popoverTemplate
        });
      }
    });
  }

  // Floating Labels
  //------------------------

  function floatingLabel() {

    var floatingLabelSelector, floatingLabelToggle;
    floatingLabelSelector = $('.floating-label > .form-control');

    floatingLabelToggle = function floatingLabelToggle(el) {
      var $el = $(el);

      if ($el.val() === '') {
        $el.siblings('label').toggleClass('floating');
      }
    };

    floatingLabelSelector.on('focus', function () {
      floatingLabelToggle(this);
    }).on('blur', function () {
      floatingLabelToggle(this);
    });
  }

  // Input Group - Focus
  //------------------------

  function inputGroups() {

    var inputGroupSelector, inputGroupToggle;
    inputGroupSelector = $('.input-group > .form-control');

    inputGroupToggle = function inputGroupToggle(el) {
      var $el = $(el);
      $el.parent('.input-group').toggleClass('focus');
    };

    inputGroupSelector.on('focus', function () {
      inputGroupToggle(this);
    }).on('blur', function () {
      inputGroupToggle(this);
    });
  }

  // Dropdown
  //------------------------

  var dropdownDontCloseOnclick = $(document).on("click", ".dropdown-dont-close-onclick", function (event) {
    event.stopPropagation();
  });

  var Functions = {
    tooltipColored: tooltipColored,
    popoverColored: popoverColored,
    floatingLabel: floatingLabel,
    inputGroups: inputGroups,
    dropdownDontCloseOnclick: dropdownDontCloseOnclick
  };
  Functions.tooltipColored();
  Functions.popoverColored();
  Functions.floatingLabel();
  Functions.inputGroups();

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Drawer = Drawer;
  exports.Functions = Functions;
  exports.TogglePassword = TogglePassword;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bend.js.map
