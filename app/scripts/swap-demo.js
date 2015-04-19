/**
 * Created by Administrator on 2015/4/19 0019.
 */
(function ($) {
  'use strict';

  $.loading.showContent();

  $('#wrapper').iscrollSwipe({
    snapSpeed: 400,
    indicators: {
      el: document.getElementById('indicator'),
      resize: false
    }
  });
}(window.Zepto));
