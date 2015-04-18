/**
 * Created by majun1 on 2015/3/2.
 */
(function(win) {
  'use strict';
  var $ = win.Zepto;
  var NAVDATA = { 
    PaySuccess: 'pay-success.html', 
    Error: 'error.html'
  };

  var _route = {
    baseURL: 'whitenotecashier/',
    transfor: function(url, options) {
      var baseUrl = 'http://' + window.location.host + '/',
        query = '';
      if (!url || !$.isString(url)) {
        return;
      }

      if (_route.baseURL && (!options || !options.disableBase)) {
        baseUrl = baseUrl + _route.baseURL;
      }

      if (options && options.data && !$.isEmptyObject(options.data)) {
        query = '?' + $.param(options.data);
      }


      window.location.href = baseUrl + url + query;
    }
  };

  $.each(NAVDATA, function(key, value) {
    _route[key] = function(options) {
      _route.transfor(value, options);
    };
  });

  $.Route = _route;
}(window));
