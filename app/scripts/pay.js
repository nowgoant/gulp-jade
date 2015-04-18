/**
 * Created by majun1 on 2015/3/24.
 */

(function ($) {
  'use strict';
  var VM = {
      flagName: '选择白条分期',
      flagDesp: '',
      rebateRight: '支持/3/6/12/24期'
    },
    reqData = {
      id: '', //由页面获取
      originalTerms: '', //选取分期数
      password: '' //密码
    },
    payVM = new PayViewModel();

  function _savePayInfo(data) {
    if (data) {
      $.objectExtend(payVM, data, true);
      console.log(payVM);
      $.session.pay().set(payVM);
    }
  }

  function _pay($ele) {
    $ele.disable();
    var rstData = {
      buttonContext: '免费领5元京券',
      id: '7jQfq7jMaiJ8cRsodUlNVg%3D%3D',
      isSendcouponMess: '1',
      issuccess: '23',
      nextAmount: '33.30',
      nextRepayDate: '2015-05-03'
    };
    // $.request.baitiaoPayOrder({
    //    data: reqData,
    //    success: function(rstData) {
    _savePayInfo(rstData);
    $.Route.PaySuccess();
    //    },
    //    error: function(msg) {
    //       $.ui.tipShow(msg);
    //       $.loading.hide();
    //       $ele.enable();
    //    }
    // });
  }


  function _createRepaymentPlan(data) {
    var html = '';
    data = [1, 2, 3, 4, 5];
    if ($.isArray(data) && data.length > 0) {
      $.each(data, function (_, item) {
        html +=
          '<li class="js_tap w100p pr" data-terms="' + $.toString(item.originalTerms) + '" >' +
          '<p class="' + (_ === (data.length - 1) ? 'in30' : '') + ' item border-1px border-bottom">' +
          '<span class="name fs-30">' + ($.equal(item.originalTerms, '1') ? '不分' : $.toString(item.originalTerms)) + '期 x ' + $.toString(item.termAmount) + '元</span>' +
          '<span class="desp">(每期含服务费' + $.toString(item.totalFeeAmount) + '元)</span>' +
          '</p>' +
          '</li>';
      });
    }

    $('#js_popup_page .list').html(html);
  }

  function _showPopPage($page) {
    if ($page.hasClass('hide')) {
      $page.removeClass('hide');
    }
    var num = setTimeout(function () {
      clearTimeout(num);
      $page.addClass('active');
    }, 10);
  }

  function _bandEvent() {
    var $page = $('#js_popup_page');
    $('.list li,.icon-page-close', $page).tap(function () {
      var $this = $(this),
        $parent = $this.parent();

      if ($this[0].nodeName === 'LI') {
        $('.cur', $parent).removeClass('cur');
        $this.addClass('cur');

        VM.flagName = $('.name', $this).text();
        VM.flagDesp = $('.desp', $this).text();
        VM.rebateRight = '';

        reqData.originalTerms = $.toString($this.data('terms'));

        $.toolView.bindDataToView(VM, '#js_rebate');
        //batePlanDialog.hide();
        $('#js_pay').enable();
      }

      $page.removeClass('active');
    }).tapActive();

    $('#js_rebate,#js_rebate_empty').tap(function () {
      _showPopPage($page);
    });

    var payDialog = null,
      helpDialog = null;
    $('#js_pay').tap(function () {
      var $this = $(this);
      if ($this.isEnable()) {
        if (!payDialog) {
          payDialog = $.ui.passwordDialog('js_pay_dailog', {
            title: '白条支付' + $.toString(VM.amount) + '元',
            success: function (val) {
              reqData.password = val;
              _pay($this);
            }
          });
        }

        payDialog.show();

      } else {
        if (!helpDialog) {
          helpDialog = $('#js_pay_help').Dialog({
            btns: [{
              name: '去选择',
              onBtn: function () {
                helpDialog.hide();
                _showPopPage($page);
              }
            }]
          });
        }
        helpDialog.show();
      }
    });
  }

  $(function () {
    console.log('开始');
    $.payShare.getBaiTiaoInfo(function (resultData, rstData) {
      if (rstData && $.equal('1', rstData.status)) {
        $.extend(VM, rstData);

        reqData.id = $.toString(VM.id);

        $.objectExtend(payVM, VM);
        console.log(payVM);

        $.toolView.bindDataToView(VM, 'body', true);

        _createRepaymentPlan(VM.repaymentList);

        _bandEvent();

        $.loading.showContent();
      } else {
        $.ui.tipBackShow($.mgs.noAuth);
        $.loading.hide();
      }
    });
  });

}(window.Zepto));
