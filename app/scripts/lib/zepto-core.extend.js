(function($) {
   'use strict';

   $.isString = function(obj) {
      return $.type(obj) === 'string';
   };

   $.isBoolean = function(obj) {
      return $.type(obj) === 'bool';
   };

   $.isNumber = function(obj) {
      return $.type(obj) === 'number';
   };

   $.isObject = function(obj) {
      return $.type(obj) === 'object';
   };

   $.disable = function(selector) {
      var self = $(selector);
      if (self && self.length > 0 && !self.hasClass('disable')) {
         self.addClass('disable');
      }
   };

   $.enable = function(selector) {
      var self = $(selector);
      if (self && self.length > 0 && self.hasClass('disable')) {
         self.removeClass('disable');
      }
   };

   $.isEnable = function(selector) {
      var self = $(selector);
      return self && self.length > 0 && false === self.hasClass('disable');
   };

   $.toString = function(val) {
      return (val || $.isNumber(val)) ? String(val) : '';
   };

   $.emptyFun = function() {};

   $.split = function(input, split) {
      if ($.isString(input)) {
         return input.split(split);
      }
      return [];
   };

   $.equal = function(val1, val2) {
      return $.toString(val1) === $.toString(val2);
   };

   $.getURLQueryObj = function(url) {
      var query = url || location.search,
         rst = {};

      if (query) {
         query = query.replace('?', '').split('&');
         if (query && query.length > 0) {
            $.each(query, function(key, val) {
               val = val.split('=');
               if (val && val.length > 1) {
                  rst[val.shift()] = val.join('=');
               }
            });
         }
      }
      return rst;
   };

   $.objectExtend = function(target, source, isAllString) {
      var key;
      for (key in target) {
         if (source[key] !== undefined) {
            target[key] = isAllString ? $.toString(source[key]) : source[key];
         }
      }
   };

   /*
    for $.fn
    */

   $.fn.disable = function() {
      $.disable(this);
   };

   $.fn.enable = function() {
      $.enable(this);
   };

   $.fn.isEnable = function() {
      return $.isEnable(this);
   };
}(window.Zepto));
