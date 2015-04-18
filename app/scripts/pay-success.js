/**
 * Created by majun1 on 2015/3/24.
 */

(function($) {
   'use strict';
   var payVM = new PayViewModel();

   function _trggerBtn() {
      var $ticket = $('#js_ticket');
      if ($.equal(payVM.isSendcouponMess, '1') && !payVM.hasSendcouponMess) {
         $ticket.text(payVM.buttonContext).show();
      }
   }

   function _bindEvent() {
      $('#js_ticket').tap(function() {
         var $this = $(this);
         if (false === $this.hasClass('btn-theme1')) {
            $.request.sendMess({
               data: {
                  id: $.toString(payVM.id)
               },
               success: function(resultData) {
                  payVM.hasSendcouponMess = true;
                  $.session.pay().update(payVM);
                  $this.addClass('btn-theme1 fs-30').text('领取方法已发送至手机 (尾号' + $.toString(resultData.moblie) + ')');
                  $.loading.hide();
               }
            });
         }
      });

      $('#btnSubmit').tap(function() {
         payVM.payFinish = true;
         $.session.pay().update(payVM);
         $('#js_success_form').attr('action', payVM.otherPayPage).submit();
      });
   }

   function _initLoadData(callback) {
      $.objectExtend(payVM, $.session.pay().get(true), true);
      console.log(payVM);
      if (!payVM.payFinish) {
         callback();
      } else {
         $.loading.hide();
         $.ui.tipForwardShow('订单已完成');
      }
   }

   $(function() {
      _initLoadData(function() {
         _trggerBtn();

         $.toolView.bindDataToView(payVM, '.main-content');

         _bindEvent();

         $.loading.showContent();
      });
   });

}(window.Zepto));
