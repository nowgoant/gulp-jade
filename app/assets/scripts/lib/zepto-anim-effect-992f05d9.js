(function ($) {
  'use strict';

  var _showEffect = {
    show: function ($ele) {
      $ele.show();
    },
    fadeIn: function ($ele) {
      $ele.show();
      $ele.addClass('fadeIn');
    }
  };

  var _hideEffect = {
    hide: function ($ele) {
      $ele.hide();
    },
    fadeOut: function ($ele) {
      $ele.addClass('fadeOut');
    }
  };

  function _setState() {
    var self = this;
    if (self.options.isShow) {
      self.$ele.show();
    } else {
      self.$ele.hide();
    }
  }

  $.define('Effect', {
    options: {
      showEffect: 'show',
      hideEffect: 'hide',
      isShow: false
    },
    init: function () {
      this.$ele.addClass('transition');
      this._bindEvent();
    },
    show: function () {
      if ($.isFunction(_showEffect[this.options.showEffect])) {
        _showEffect[this.options.showEffect](this.$ele);
        this.options.isShow = true;
      }
    },
    hide: function () {
      if ($.isFunction(_hideEffect[this.options.hideEffect])) {
        _hideEffect[this.options.hideEffect](this.$ele);
        this.options.isShow = false;
      }
    },
    _bindEvent: function () {
      var self = this;
      self.$ele.transitionEnd(function () {
        _setState.call(self);
      });

      self.$ele.simpleAnimationEnd(function () {
        _setState.call(self);
      });
    }
  });
}(window.Zepto));
