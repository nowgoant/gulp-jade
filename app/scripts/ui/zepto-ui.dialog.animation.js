/**
 * Created by majun1 on 2015/3/27.
 */

(function ($) {
  'use strict';
var isShow=false;

  var _dialogAnim = function (config) {
    var $wrap = this, dialog;

    config = config || {};

    dialog = $wrap.dialog(config);

    $('.ui-mask,.ui-dialog', $wrap).simpleAnimationEnd(function ($ele) {
      if($ele.hasClass(config.startClassName)){
        $ele.removeClass(config.startClassName);
      }

      if(false === isShow){
        dialog.hide();
      }
    });

    return {
      dialog: dialog,
      show: function () {
        var dia = $('.ui-dialog', $wrap),mask=$('.ui-mask', $wrap);
        mask.addClass(config.startClassName);
        dia.addClass(config.startClassName);

        dialog.show();

        setTimeout(function () {
          dia.addClass(config.dialogIn);
          mask.addClass(config.maskIn);
        }, 10);

        isShow=true;
      },
      hide: function () {
        $('.ui-dialog', $wrap).addClass(config.dialogOut);
        $('.ui-mask', $wrap).addClass(config.maskOut);

        isShow = false;
      }
    };
  };

  $.fn.dialogAnim = _dialogAnim;
}(window.Zepto));
