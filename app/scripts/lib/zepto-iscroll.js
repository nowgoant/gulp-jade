(function ($) {
  'use strict';
  var defaultOptions = {
    /*
     * 是否启用弹力动画效果，关掉可以加速
     */
    bounce: false,
    disableMouse: true,
    /*
     * 是否开启动量动画，关闭可以提升效率。
     */
    momentum: false,
    /*
     * 监听按键事件控制
     */
    keyBindings: false
  };

  $.fn.iscroll = function (options) {
    if (!$.isObject(options)) {
      return;
    }

    var opts = $.extend({}, defaultOptions, options);
    this.each(function (_, item) {
      item.scroll = new IScroll(item, opts);
      console.log(item.scroll);
    });
  };

  $.fn.iscrollSwipe = function (options) {
    if (!$.isObject(options)) {
      return;
    }
    options.scrollX = true;
    options.scrollY = false;
    options.snap = true;
    this.iscroll(options);
  };

  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false);
}(window.Zepto));
