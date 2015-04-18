(function($) {
    'use strict';
    var defaultOptions = {
        seconds: 59,
        url: ''
    };

    $.fn.simpleTimer = function(options) {
        var opts, _resetUpTimer,
            $this = this;

        opts = $.extend({}, defaultOptions, options);

        _resetUpTimer = function($ele) {
            $.timer.simple(opts.seconds, $ele);
        };

        function _sendSMS($ele) {
            _resetUpTimer($ele);

            $.request.send(options);
        }

        $this.tap(function() {
            var $this = $(this),
                txt = $this.text().trim();

            if ($this.isEnable() || txt === $.mgs.sendVerify) {
                _sendSMS($this);
            }
        });

        return {
            resetUp: function(isSendSMS) {
                if (isSendSMS) {
                    _sendSMS($this);
                } else {
                    _resetUpTimer($this);
                }
            }
        };
    };
}(window.Zepto));
