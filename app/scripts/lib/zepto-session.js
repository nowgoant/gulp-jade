/**
 * Created by majun1 on 2015/3/4.
 */

(function ($) {
  'use strict';

  var KEYS = {    
    pay: 'PAYINFO'
  };

  var _session = {};

  $.each(KEYS, function (key, sessionKey) {
    if (sessionKey && key) {
      _session[key] = function () {
        var rst = {
          get: function (isJSON) {
            if (sessionStorage) {
              var val = sessionStorage.getItem(sessionKey);

              if (isJSON && val) {
                val = $.parseJSON(val);
              }

              return val;
            }
          },
          set: function (val) {
            if ($.isObject(val)) {
              val = JSON.stringify(val);
            }

            if (sessionStorage) {
              sessionStorage.setItem(sessionKey, val ? val : '');
            }
          },
          update: function (data,isJSON) {
            var old;
            if (data) {
              if(isJSON){
                old= rst.get(isJSON);

                if (!old) {
                  old = {};
                }

                $.extend(old, data);

                $.session.pay().set(old);
              }else{
                $.session.pay().set(data);
              }
            }
          }
        };

        return rst;
      };
    }
  });

  $.session = _session;
}(window.Zepto));
