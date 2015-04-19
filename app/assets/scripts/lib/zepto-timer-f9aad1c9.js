(function($) {
  'use strict';
  var inter;
  var _timer = {
    // matches mm/dd/yyyy (requires leading 0's (which may be a bit silly, what do you think?)
    runSecond: function(seconds, callback) {
      if (!seconds) {
        return;
      }

      if (inter) {
        clearInterval(inter);
      }

      inter = setInterval(function() {
        if (seconds < 1) {
          clearInterval(inter);
        }
        if (callback) {
          callback(seconds);
        }

        seconds--;
      }, 1000);
    },
    simple: function(seconds, uiEle) {
      if (seconds > 0 && uiEle) {
        var $ele = $(uiEle);
        _timer.runSecond(seconds, function(second) {
          if ($ele && $ele.length > 0) {
            $ele.html(second + $.mgs.second);
            if (second === 0) {
              $ele.removeClass('disable').html($.mgs.timerBtn);
            } else {
              $ele.addClass('disable');
            }
          }
        });
      }
    }
  };

  $.timer = _timer;
}(window.Zepto));
