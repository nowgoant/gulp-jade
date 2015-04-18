(function($) {
   'use strict';
   var BODY = 'body',
      JSTXT = '.js_txt',
      ICONCLEAR = '.icon-clear';

   function getVal($Ele) {
      var battr = $Ele.attr('bind-attr'),
         val;
      val = $Ele.attr(battr ? battr : 'value');
      return val ? val.trim() : '';
   }

   function checkRequired(selector, context) {
      var enable = true;
      $(selector, context).each(function() {
         var self = $(this),
            required = self.attr('data-rule'),
            val = getVal(self);
         //console.log(this);
         if (required && required.indexOf('required') > -1 && !val) {
            enable = false;
            return false;
         }
      });

      if (enable) {
         $('.btnSubmit', context).enable();
      } else {
         $('.btnSubmit', context).disable();
      }
   }

   function checkSpace($ele, rule, val) {
      if (!$ele || !rule) {
         return;
      }

      if (rule.indexOf('space') > -1) {
         val = $.trim(val);
         $ele.val(val);
      }

      return val;
   }

   function checkClear(rule) {
      return rule && rule.indexOf('noClear') > -1;
   }

   var _view = {
      bindDataToView: function(data, context) {
         if (data) {
            context = context || BODY;

            $.each(data, function(key, val) {
               var target = $('#js-' + key, context);
               if (target && target.length > 0) {
                  val = val ? val : '';
                  switch (target[0].nodeName.toUpperCase()) {
                     case 'INPUT':
                        target.val(val);
                        break;
                     default:
                        target.html(val);
                        break;
                  }
               }
            });
         }
      },
      collectDataFormView: function(data, context) {
         var rst = {};

         if (data) {
            context = context || BODY;

            $.each(data, function(key) {
               var target = $('#js-' + key, context);
               if (target && target.length > 0) {
                  switch (target[0].nodeName.toUpperCase()) {
                     case 'INPUT':
                        data[key] = target.val();
                        break;
                     default:
                        data[key] = target.html();
                        break;
                  }
               }
            });
         }
         return rst;
      },
      checkInput: function(ele, enableClear, context, selector) {
         var rule, val, $ele = $(ele);

         selector = selector || JSTXT;
         context = context || BODY;

         if (!$ele || $ele.length === 0) {
            return;
         }

         val = getVal($ele);

         rule = $ele.attr('data-rule');

         val = checkSpace($ele, rule, val);

         if (!checkClear(rule) && enableClear) {
            if (val) {
               $ele.parent().addClass('show-clear');
            } else {
               $ele.parent().removeClass('show-clear');
            }
         }

         checkRequired(selector, context);
      },
      /*
       *
       * 监控页面上input 输入框，有输入，按钮启用，反之不可用
       *
       * */
      monitorInput: function(enableClear, context, selector) {
         selector = selector || JSTXT;
         context = context || BODY;

         $(selector, context).on('input', function() {
            _view.checkInput($(this), enableClear, context, selector);
         });

         if (enableClear) {
            _view.bindClearInput(null, context);
         }
      },
      checkClearInput: function(ele, context, selector) {
         var $ele = $(ele),
            parent;

         selector = selector || JSTXT;
         context = context || BODY;

         if (!$ele || $ele.length === 0) {
            return;
         }

         parent = $ele ? $ele.parent() : null;

         if (parent) {
            $('input', parent).val('');
            parent.removeClass('show-clear');
         }

         checkRequired(selector, context);
      },
      bindClearInput: function(selector, context) {
         selector = selector || ICONCLEAR;
         context = context || BODY;

         $(selector, context).on('tap', function() {
            _view.checkClearInput(this, context);
         });
      }
   };

   $.toolView = _view;
}(window.Zepto));
