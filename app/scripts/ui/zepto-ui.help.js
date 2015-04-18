(function($) {
  'use strict';

  var _help = {
    init: function(options) {
      var isShow = true;
      options = options || {};
      $('.js_help_close').tap(function() {
        $(this).parent().hide();
      });

      $('.js_icon_help').tap(function() {
        var self = $(this),
          target = $(self.attr('data-target'));

        if (target && target.length > 0) {
          if ($.isFunction(options.beforeOpen)) {
            isShow = options.beforeOpen(target);
          }
          if (isShow) {
            target.show();
          }
        }
      });
    }
  };

  $.help = _help;
}(window.Zepto));
