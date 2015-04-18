(function(win, $) {
   'use strict';
   var SMSSELECTOR = 'smsDialog',
      INPUTSELECTOR = 'js_txt';

   var creditDialog, smsDialog;

   // $.extend($.mgs || {}, );
   function triggerLable(enable, context, html) {
      var lable = $('.lable', context);
      if (enable) {
         lable.addClass('error').html(html);
      } else {
         lable.removeClass('error').html(lable.attr('data-tips'));
      }
   }

   function _get(parentId, selector) {
      return $('#' + parentId + ' .' + selector);
   }

   function triggerByVal(val, context, selector) {
      _get(context, selector).val($.toString(val)).trigger('input');
   }

   win.setSmsCode = function(code) {
      if (code) {
         triggerByVal(code, SMSSELECTOR, INPUTSELECTOR);
      }
   };

   var tel = {
      sms: function(data) {
         var html = '';
         if (data) {
            html += '<div id="' + SMSSELECTOR + '" title="' + $.mgs.smsTitle(data.title) + '" class="ui-sms-c hide">' +
               '<div class="lable" data-tips="' + $.mgs.smsLable(data.phone) + '">' + $.mgs.smsLable(data.phone) + '</div>' +
               '<div class="pr row w100p">' +
               '<div class="pr col-md-6 inputBox bg-white">' +
               '<input id="js-IDCode" data-rule="required num" type="tel" class="js_txt w100p txt" maxlength="6" placeholder="' + $.mgs.verifyCode + '" autocomplete="off" />' +
               '<i class="icon-clear"></i>' +
               '</div>' +
               '<div class="js_tap inputBox col-md-5 calculator disable">' +
               '</div>' +
               '</div>' +
               '</div>';
         }

         return html;
      },
      credit: function() {
         var html = '<div id="creditDialog" title="' + $.mgs.creditTitle + '" class="ui-sms-c hide">' +
            '<div class="lable" data-tips="' + $.mgs.creditLable + '">' + $.mgs.creditLable + '</div>' +
            '<div class="pr inputBox bg-white">' +
            '<input class="js_txt w100p txt" data-rule="required num" type="tel" maxlength="3" placeholder="' + $.mgs.cvvNum + '" autocomplete="off"/>' +
            '<i class="icon-clear"></i>' +
            '</div>' +
            '</div>';

         return html;
      }
   };

   var _view = {
      careteCredit: function(options) {
         if (!creditDialog && options) {
            $('body').append(tel.credit());
            var selector = '#creditDialog';

            creditDialog = $(selector).dialog({
               isMonitorInput: true,
               btns: [{
                  name: $.mgs.btnCancel
               }, {
                  name: $.mgs.btnConfirm,
                  className: 'btnSubmit disable',
                  onBtn: function() {
                     var val = $(selector + ' .js_txt').val().trim();

                     if (val && val.length < 3) {
                        triggerLable(true, selector, $.mgs.num($.mgs.cvv, '3'));
                        return;
                     }

                     if (val && options.success) {
                        options.success(val);
                        creditDialog.hide();
                        //$.loading.show();
                     }
                  }
               }]
            });


            $('.js_txt', selector).bind('input', function() {
               triggerLable(false, selector);
            });
         }
         return creditDialog;
      },
      careteSMS: function(data, options) {
         var dialog = null,
            selector = '#' + SMSSELECTOR,
            resetUpTimer;

         if (!smsDialog && options) {
            $('body').append(tel.sms(data));

            dialog = $(selector).dialog({
               isMonitorInput: true,
               btns: [{
                  name: $.mgs.btnCancel
               }, {
                  name: $.mgs.btnConfirm,
                  className: 'btnSubmit disable',
                  onBtn: function() {
                     var $txt = _get(SMSSELECTOR, INPUTSELECTOR),
                        val = $txt.val().trim();

                     if (val && val.length < 6) {
                        triggerLable(true, selector, $.mgs.verifyCodeRule);
                        return;
                     }

                     if (val && options.success) {
                        options.success($txt, val);
                        $.loading.show();
                     }
                  }
               }]
            });

            _get(SMSSELECTOR, INPUTSELECTOR).bind('input', function() {
               triggerLable(false, selector);
            });

            resetUpTimer = $('.calculator', selector).simpleTimer({
               url: options.timerURL,
               data: options.timerData,
               success: function(rstData) {
                  smsDialog.token = $.toString(rstData.token);
                  $.loading.hide();
                  triggerByVal('', SMSSELECTOR, INPUTSELECTOR);
                  smsDialog.show();
               }
            });

            smsDialog = {
               token: '',
               show: function() {
                  dialog.show();
               },
               hide: function() {
                  dialog.hide();
               },
               resetUp: function() {
                  resetUpTimer.resetUp(true);
               }
            };
         }

         return smsDialog;
      }
   };

   $.bankView = _view;
}(window, window.Zepto));
