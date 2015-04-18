(function ($) {
  'use strict';

  var _methods = {
    minLength: function (val, length) {
      return val.length >= length;
    },
    maxLength: function (val, length) {
      return val.length <= length;
    },
    equal: function (val1, val2) {
      return (val1 === val2);
    },
    special: function (val) {
      return !!(val.match(/[^\x00-\xff]/g) && val.match(/[^\x00-\xff]/g).length / val.length > 0.1) && !/[(\u5bf9\u9762)|(\u95e8\u53e3)|(\u65c1\u8fb9)|(\u9694\u58c1)|(\u9644\u8fd1)|(\u4ea4\u53c9\u53e3)|(\u4e4b\u95f4)|(\u5341\u5b57\u8def\u53e3)|(\u81ea\u63d0\u70b9)|(\u81ea\u63d0)]+$/gi.test(val) && !/[\uff41-\uff5a]/.test(val);
    }
  };

  $.validationMethods = _methods;
}(window.Zepto));
