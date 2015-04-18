/**
 * Created by majun1 on 2015/3/24.
 */

(function($) {
   'use strict';
   var STATES = {
      '0': {
         meg: '您尚未激活白条服务',
         icon: 'icon-activation'
      },
      '1': {
         meg: '已激活-余额足够',
         icon: ''
      },
      '2': {
         meg: '抱歉，白条额度不足',
         icon: 'icon-less'
      },
      '3': {
         meg: '抱歉，您的白条额度已冻结',
         icon: 'icon-snow'
      }
   };

   var resultData = {
      meg: '',
      desp: '如有问题，请致电京东金融客服400 622 7186',
      isActivation: false,
      iconClassName: ''
   };

   var _payshare = {
      states: STATES,
      getBaiTiaoInfo: function(callback) {
         // var data = {
         //    id: 'BeLqd%2F%2Brz3E56ZGDnVvqJw%3D%3D'
         // };
         var data = $.getURLQueryObj();

         $.request.baitiaoInfo({
            data: data,
            error: function(rstData) {
               console.log(rstData);
               rstData = {
                   status: 1,
                   amount: '应付金额', //应付金额
                   availableLimit: '白条余额', //白条余额
                   payedResidualLimit: '支付完成后白条剩余金额', //支付完成后白条剩余金额
                   id: '', //订单id
                   otherPayPage: 'http://jd.com', //其他支付方式跳转页
                   repaymentList: []
               };

               rstData.status = $.toString(rstData.status);

               var state = STATES[rstData.status];

               if (state) {
                  resultData.meg = state.meg;
                  resultData.iconClassName = state.icon;
               }

               switch (rstData.status) {
                  case '0':
                     resultData.isActivation = true;
                     break;
                  case '2':
                     resultData.desp = $.uiTemplate.bindData('当前白条可用额度: #{availableLimit}元', rstData);
                     break;
               }

               callback(resultData, rstData);
            }
         });
      }
   };

   $.payShare = _payshare;
}(window.Zepto));
