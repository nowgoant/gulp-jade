(function ($) {
  'use strict';

  var effect = $('.loading-box').Effect({
    hideEffect: 'fadeOut'
  });

  var _loading = {
    show: function () {
      effect.show();
    },
    hide: function () {
      effect.hide();
    },
    showContent: function () {
      $('.main-content').show();
      _loading.hide();
    }
  };

  $.loading = _loading;
}(window.Zepto));

