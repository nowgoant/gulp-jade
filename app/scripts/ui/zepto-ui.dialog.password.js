/**
 * Created by majun1 on 2015/3/2.
 */

(function ($, ui) {
  'use strict';

  function tel(config) {
    var htmlstr = '';
    if (config) {
      htmlstr += '<div class="leabl">请输入京东支付密码<span class="js_tap col-md-3 fr ellipsis less-pw">忘记密码</span></div>' +
      '<div class="pr row w100p bg-white border-1px inputBox">' +
      '<input type="password" data-rule="required space" class="js-password js_txt pl30 w100p" maxlength="21" placeholder="支付密码" autocomplete="off"/>' +
      '<i class="icon-clear"></i>' +
      '</div>';
    }

    return htmlstr;
  }

  function _val($wrap, val) {
    var pw = $('.js-password', $wrap);

    if (pw.length > 0) {
      return 1 in arguments ?
        pw.val(val).trigger('input') :
        pw.val().trim();
    }
  }

  function _hide(pwDialog, $wrap) {
    _val($wrap, '');
    pwDialog.hide();
  }

  var _password = function (id, options) {
    var $wrap = $('#' + id),
      pwDialog;

    if (!$wrap || $wrap.length === 0) {
      return;
    }

    $wrap.addClass('ui-password');

    pwDialog = $wrap.Dialog({
      originalHtml: tel(options),
      title: options.title,
      isMonitorInput: true,
      animation: true,
      hideAfter: function ($wrap) {
        _val($wrap, '');
      },
      btns: [{
        name: $.mgs.btnCancel
      }, {
        name: $.mgs.btnConfirm,
        className: 'btnSubmit disable',
        onBtn: function () {
          var $this = this;
          if ($this.isEnable()) {
            options.success(_val($wrap));
            _hide(pwDialog, $wrap);
          }
        }
      }]
    });

    return pwDialog;
  };

  ui.passwordDialog = _password;
}(window.Zepto, window.Zepto.ui || {}));
