/**
 * Created by majun1 on 2015/3/24.
 */

(function($) {
   'use strict';
   var VM = {};

   function _trggerBtn(isActivation) {
      var $pay = $('#js_pay_mode');
      if (isActivation) {
         $('#js_activation').show();
         $pay.removeClass('mt60').addClass('mt20');
      }

      $pay.addClass('btn-white').show();
   }

   function _setIcon(iconClassName) {
      $('#js_top_icon').addClass(iconClassName);
   }

   function _bindEvent() {
      var $form = $('#js_mode_form');
      $('#js_pay_mode').tap(function() {
         $form.attr('action', VM.otherPayPage).submit();
      });
      $('#js_activation').tap(function() {
         var url = $.request.baseUrl + $.request.urls.baitiaoActivityIndex.url + '?id=' + $.toString(VM.id);
         console.log(url);
         $form.attr('action', url).submit();
      });
   }

   $(function() {
      $.payShare.getBaiTiaoInfo(function(resultData, rstData) {
         if (rstData && false === $.equal('1', rstData.status)) {
            $.extend(VM, resultData, rstData);

            console.log(VM);

            _trggerBtn(VM.isActivation);

            _setIcon(VM.iconClassName);

            _bindEvent();

            $.toolView.bindDataToView(VM, '.main-content');

            $.loading.showContent();
         } else {
            $.ui.tipBackShow($.mgs.noAuth);
            $.loading.hide();
         }
      });
   });
}(window.Zepto));
