(function ($) {
  'use strict';
  $.Class = function () {
    var length = arguments.length;
    var option = arguments[length - 1];
    option.init = option.init || function () {
    };
    option.$ele = this || {};

    if (length === 2) {
      var superClass = arguments[0].extend;

      var TempClass = function () {
      };
      TempClass.prototype = superClass.prototype;

      var subClass = function () {
        return new subClass.prototype._init(arguments);
      };

      subClass.superClass = superClass.prototype;
      subClass.callSuper = function (context, func) {
        var slice = Array.prototype.slice;
        var a = slice.call(arguments, 2);

        func = subClass.superClass[func];

        if (func) {
          func.apply(context, a.concat(slice.call(arguments)));
        }
      };

      subClass.prototype = new TempClass();
      subClass.prototype.constructor = subClass;

      $.extend(subClass.prototype, option);

      subClass.prototype._init = function () {
        this.init.apply(this);
      };
      subClass.prototype._init.prototype = subClass.prototype;

      return subClass;
    } else if (length === 1) {
      var newClass = function () {
        return new newClass.prototype._init(arguments);
      };
      newClass.prototype = option;
      newClass.prototype._init = function () {
        this.init.apply(this);
      };
      newClass.prototype._init.prototype = newClass.prototype;
      return newClass;
    }
  };

  $.define = function () {
    var args = Array.prototype.slice.call(arguments);
    console.log(args);
    if (!args || args.length < 2) {
      return;
    }
    $.fn[args.shift()] = function () {
      if (args && args.length > 0 && 0 in arguments) {
        args[0].options = args[0].options || {};
        $.extend(args[0].options , arguments[0]);
        //console.log(args[0].options);
      }

      var tempFun = $.Class.apply(this, args);

      if ($.isFunction(tempFun)) {
        return tempFun();
      }
      return null;
    };
  };
})(window.Zepto);
