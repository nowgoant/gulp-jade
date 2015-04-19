/**
 * Created by majun1 on 2015/3/9.
 */

(function ($) {
  'use strict';
  var _temp = {
    bindData: function (template, data) {
      if (data && $.isObject(data) && $.isString(template)) {
        template = template.replace(/#\{(.+?)\}/g, function (n, t) {
          var keys, val;
          keys = t.split('|');
          val = (typeof data[keys[0]] !== 'undefined') ? data[keys[0]] : '';
          return val;
        });
      }
      return template;
    }
  };

  $.uiTemplate = _temp;
}(window.Zepto));
