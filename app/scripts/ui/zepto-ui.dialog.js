
(function ($) {
  'use strict';

  function _createBtns(btns) {
    var rst = '';
    if (btns) {
      $.each(btns, function (index, item) {
        var className = item.className ? item.className : '';
        rst += '<a class="js_tap js_blur border-1px ui-btn ui-btn-' + index + ' ' + className + '" data-index="' + index + '">' + (item.name ? item.name : '') + '</a>';
      });
    }
    return rst;
  }

  function _createTitle(options) {
    if (options && options.title) {
      return '<p class="ui-dialog-title border-1px">' + options.title + '</p>';
    }
    return '';
  }

  function _tel(options) {
    var htmlstr = '';
    if (options) {
      htmlstr +=
        '<i class="js_mask ui-mask w100p h100p ' + $.toString(options.maskClassName) +
        '"></i><div class="bfc pa ui-dialog ' + $.toString(options.dialogClassName) +
        '"><div class="pa js_tap js_blur btn-close ' + (options.hasCloseIcon ? '' : 'hide') +
        '"></div>' + _createTitle(options) +
        '<div class="ui-dialog-content">' + $.toString(options.originalHtml) +
        '</div><div class="ui-dialog-btns">' + _createBtns(options.btns) +
        '</div></div>';
    }

    return htmlstr;
  }

  function _getAnimEle($wrap, onlyDialog) {
    return onlyDialog ? $('.ui-dialog', $wrap) : $('.ui-dialog,.ui-mask', $wrap);
  }

  function _tabInput($wrap) {
    setTimeout(function () {
      $('input[type=text],input[type=password]', $wrap).eq(0).focus();
    }, 100);
  }

  function _hide($wrap, options) {
    var $animEle = null;
    if (options.animation) {
      $animEle = _getAnimEle($wrap);
      $animEle.removeClass(options.maskInClass);
    } else {
      $wrap.removeClass('show');
    }

    options.hasShow = false;

    if ($.isFunction(options.hideAfter)) {
      options.hideAfter($wrap);
    }
  }

  function _bindEvent($wrap, options) {
    var $animEle = _getAnimEle($wrap, true);

    $('.ui-btn', $wrap).tap(function (evt) {
      var $this = $(this);
      var index = $this.attr('data-index');
      if (options.btns[index]) {
        if ($.isFunction(options.btns[index].onBtn)) {
          options.btns[index].onBtn.call($this, evt);
        } else {
          _hide($wrap, options);
        }
      } else {
        evt.stopPropagation();
      }
    }).tapActive();

    $('.btn-close', $wrap).tap(function () {
      _hide($wrap, options);
    });

    if (options.isMonitorInput) {
      $.toolView.monitorInput(true, $wrap);
      $.inputBlur(null, $wrap);
    }

    $animEle.transitionEnd(function () {
      if (options.hasShow) {
        _tabInput($wrap);
      } else {
        $wrap.removeClass('show');
      }
    });
  }

  $.define('Dialog', {
    options: {
      wrapClassName: '',
      isMonitorInput: true,
      startClassName: 'effect',
      dialogInClass: 'jd-show',
      maskInClass: 'jd-show',
      animation: true,
      hasShow: false,
      title: '',
      originalHtml: '',
      btns: []
    },
    init: function () {
      var $wrap = this.$ele,
        opts=this.options;

      console.log(opts);
      if ($wrap && $wrap.length > 0) {
        opts.originalHtml = $.toString(opts.originalHtml) || $wrap.html();
        opts.title = $.toString(opts.title) || $wrap.attr('title');

        $wrap.addClass($.toString(opts.wrapClassName) + ' ui-dialog-box bfc pa w100p h100p hide')
          .html(_tel(opts));

        _bindEvent($wrap, opts);
      }
    },
    show: function () {
      var self = this,
        opts = self.options,
        $wrap = self.$ele,
        $animEle;

      $wrap.addClass('show');
      opts.hasShow = true;

      if (opts.animation) {
        $animEle = _getAnimEle($wrap);

        if (!$animEle.hasClass(opts.startClassName)) {
          $animEle.addClass(opts.startClassName);
        }

        setTimeout(function () {
          $animEle.addClass(opts.dialogInClass);
        }, 10);
      } else {
        _tabInput($wrap);
      }
    },
    hide: function () {
      _hide(this.$ele, this.options);
    },
    setValue: function (htmlstr) {
      $('.ui-dialog-content', this.$ele).html(htmlstr ? htmlstr : '');
    },
    showByValue: function (htmlstr) {
      this.setValue(htmlstr);
      this.show();
    }
  });
}(window.Zepto));


(function ($, ui) {
  'use strict';
  var tipsDialog = null,
    SELECTOR = '#js_base_tips',
    onCloseDialog = $.emptyFun;

  function _createTip() {
    if (!tipsDialog) {
      $('body').append('<div id="js_base_tips" class="txt-center hide"></div>');

      tipsDialog = $(SELECTOR).Dialog({
        btns: [{
          name: $.mgs.tipbtn,
          onBtn: function (evt) {
            tipsDialog.hide();

            if ($.isFunction(onCloseDialog)) {
              onCloseDialog();
            }

            evt.stopPropagation();
          }
        }]
      });
    }
  }

  ui.tipShow = function (msg, onClosefun) {
    _createTip();

    if (onClosefun && $.isFunction(onClosefun)) {
      onCloseDialog = onClosefun;
    }

    tipsDialog.showByValue($.toString(msg));
  };

  ui.tipBackShow = function (msg) {
    ui.tipShow(msg, function () {
      window.history.go(-1);
    });
  };

  ui.tipForwardShow = function (msg) {
    ui.tipShow(msg, function () {
      window.history.go(1);
    });
  };

  ui.tipHide = function () {
    _createTip();
    tipsDialog.hide();
  };
}(window.Zepto, window.Zepto.ui || {}));



