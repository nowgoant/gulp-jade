/**
 * Created by majun1 on 2015/3/2.
 */

(function($) {
   'use strict';
   var BODY = 'body';

   $.bindTapActive = function(selector, context) {
      context = context || BODY;

      $(selector, context).on('touchstart', function() {
         var self = $(this),
            className = 'tap-active';

         if (false === $(this).hasClass(className)) {
            self.addClass(className);

            var timeout = setTimeout(function() {
               clearTimeout(timeout);
               self.removeClass(className);
            }, 200);
         }
      });
   };

   $.fn.tapActive = function() {
      $.bindTapActive(this);
   };

   $.inputBlur = function(selector, context) {
      context = context || BODY;
      selector = selector || '.js_blur';
      $(selector, context).tap(function() {
         $('input', context).blur();
      });
   };

   $(function() {
      $.bindTapActive('.js_tap');

      $.inputBlur();
   });

   $.ui = {};
}(window.Zepto));
