/**
 * Created by majun1 on 2015/3/4.
 */

(function($) {
   'use strict';
   var BASEURL = 'http://ms.jr.jd.com/jrpmobile/baitiao/cashierDeskWap/';

   var REQUESTS = {
      //白条收银台登陆页数据
      baitiaoInfo: {},
      // 确认支付白条
      baitiaoPayOrder: {},
      //发送短信
      sendMess: {},
      //白条激活
      baitiaoActivityIndex: {
         url: 'baitiaoActivityIndex'
      }
   };

   var defaultOptions = {
      resultLevel: 0,
      enableError: true,
      error: null,
      success: $.emptyFun,
      data: '',
      url: '',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json;charset=UTF-8'
   };

   function _defaultSendData(reqData) {
      var _reqData = {
         id: '',
         pin: '',
         clientType: '',
         deviceId: '',
         version: 1000
      };

      $.extend(_reqData, reqData);

      var data = {
         signature: '',
         timestamp: '',
         accessKey: '',
         reqData: JSON.stringify(_reqData)
      };

      return data;
   }

   function _showError(msg, options) {
      if ($.isFunction(options.error)) {
         options.error(msg || $.msg.error);
      } else if (options.enableError || false === $.isFunction(options.error)) {
         $.ui.tipShow(msg || $.mgs.error);
         $.loading.hide();
      }
   }

   var _request = {
      urls: REQUESTS,
      baseUrl: BASEURL,
      send: function(options) {
         var opt = null;
         if (options) {
            opt = $.extend({}, defaultOptions, options);
            //console.log(opt);
            console.log(opt.data);

            $.loading.show();

            opt.data = _defaultSendData(opt.data);

            $.ajax({
               type: opt.type,
               url: opt.url,
               data: JSON.stringify(opt.data) || '',
               dataType: opt.dataType,
               contentType: opt.contentType,
               success: function(data) {
                  if (data) {
                     if ($.isString(data)) {
                        data = $.parseJSON(data);
                     }
                     switch (data.resultCode) {
                        case 0:
                           //返回一级结果
                           var rstData = data.resultData;
                           if (opt.resultLevel === 1) {
                              opt.success(data);
                           } else if (rstData && rstData.issuccess === '1') {
                              opt.success(rstData);
                              return;
                           } else {
                              _showError(rstData.error_msg, opt);
                           }
                           break;
                        default:
                           _showError(data.resultMsg, opt);
                           break;
                     }
                  } else {
                     $.ui.tipShow($.mgs.noData);
                  }
               },
               error: function() {
                  _showError($.mgs.noNet, opt);
                  if ($.Route && $.Route.Error) {
                     //              $.Route.Error();
                  }
               }
            });
         }
      }
   };

   $.each(REQUESTS, function(key, value) {
      var url = value.url || key;
      _request[key] = function(options) {
         if (options && url) {
            options.url = BASEURL + url;
            _request.send(options);
         }
      };
   });

   $.request = _request;
}(window.Zepto));
