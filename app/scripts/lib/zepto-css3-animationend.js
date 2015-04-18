(function($) {
   'use strict';
   var transitionEvents = 'webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionEnd transitionEnd';

   $.fn.animationend = function(callback) {
      return this.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback);
   };

   $.fn.transitionEnd = function(callback, isOne) {
      return isOne ? this.one(transitionEvents, callback) : this.on(transitionEvents, callback);
   };

   $.fn.offTransitionEnd = function() {
      return this.off(transitionEvents);
   };

   $.fn.simpleAnimationEnd = function(callback) {
      return this.animationend(function(ele) {
         var cls = ele.animationName,
            $ele;
         $ele = $(ele.currentTarget);

         if (cls) {
            $ele.removeClass(cls);
         }

         if ($.isFunction(callback)) {
            callback($ele, cls);
         }
      });
   };
}(window.Zepto));
