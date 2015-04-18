var PayViewModel = (function() {
   'use strict';

   function PayViewModel() {
      //订单号
      this.id = '';
      //本次支付金额
      this.amount = '';
      //下次支付时间
      this.nextRepayDate = '';
      //下次支付金额
      this.nextAmount = '';

      this.isSendcouponMess = '';

      this.buttonContext = '';

      this.otherPayPage = '';

      this.hasSendcouponMess = '';

      this.payFinish = '';
   }

   return PayViewModel;
})();
