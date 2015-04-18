/**
 * Created by majun1 on 2015/3/4.
 */

(function ($) {
  'use strict';
  var authvm = {
    referer: ''
  };

  var _authentication = {
    init: function () {
      var curreferer = $('body').attr('data-referer'), auth = '';

      auth = $.session.auth().get();

      if (curreferer && auth && auth.referer === curreferer) {
        authvm.referer = location.pathname;
        $.session.auth().set(authvm);
      } else {

      }
    }
  };

  $.authentication = _authentication;

}(window.Zepto));

