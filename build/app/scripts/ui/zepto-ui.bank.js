(function($, ui) {
    'use strict';
    var cards,
        defaultFormat = /(\d{1,4})/g;

    cards = [{
        type: 'amex',
        pattern: /^3[47]/,
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        length: [15],
        cvcLength: [3, 4],
        luhn: true
    }, {
        type: 'dankort',
        pattern: /^5019/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'dinersclub',
        pattern: /^(36|38|30[0-5])/,
        format: defaultFormat,
        length: [14],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'discover',
        pattern: /^(6011|65|64[4-9]|622)/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'jcb',
        pattern: /^35/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'laser',
        pattern: /^(6706|6771|6709)/,
        format: defaultFormat,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'maestro',
        pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
        format: defaultFormat,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'mastercard',
        pattern: /^5[1-5]/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'unionpay',
        pattern: /^62/,
        format: defaultFormat,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: false
    }, {
        type: 'visaelectron',
        pattern: /^4(026|17500|405|508|844|91[37])/,
        format: defaultFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'visa',
        pattern: /^4/,
        format: defaultFormat,
        length: [13, 14, 15, 16],
        cvcLength: [3],
        luhn: true
    }];

    function normalizeEvent(evt) {
        evt.which = evt.which !== null ? evt.which : void 0;
        if (evt.which === null) {
            evt.which = evt.charCode !== null ? evt.charCode : evt.keyCode;
        }
        return evt;
    }

    function cardFromNumber(num) {
        var card, _i, _len;
        num = (num + '').replace(/\D/g, '');
        for (_i = 0, _len = cards.length; _i < _len; _i++) {
            card = cards[_i];
            if (card.pattern.test(num)) {
                return card;
            }
        }
    }

    function hasTextSelected(target) {
        // var _ref;
        if ((target.selectionStart !== null) && target.selectionStart !== target.selectionEnd) {
            return true;
        }
        // if ((typeof document !== 'undefined' && document !== null ? (typeof (_ref = document.selection)) !== 'undefined' ? _ref.createRange : void 0 : void 0) !== 'undefined') {
        //     if (document.selection.createRange().text) {
        //         return true;
        //     }
        // }
        return false;
    }

    function restrictCardNumber($ele, e) {
        var card, digit, target, value;
        target = e.target;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        if (hasTextSelected(target)) {
            return;
        }
        value = ($ele.val() + digit).replace(/\D/g, '');
        card = cardFromNumber(value);
        if (card) {
            if (false === (value.length <= card.length[card.length.length - 1])) {
                return e.preventDefault();
            }
        } else {
            if (false === (value.length <= 16)) {
                return e.preventDefault();
            }
        }
    }

    function formatCardNumber($ele, e) {
        var card, digit, length, re, target, upperLength, value;
        digit = String.fromCharCode(e.which);
        if (!/^\d+$/.test(digit)) {
            return;
        }
        target = e.target;
        value = $ele.val();
        card = cardFromNumber(value + digit);
        length = (value.replace(/\D/g, '') + digit).length;
        upperLength = 16;
        if (card) {
            upperLength = card.length[card.length.length - 1];
        }
        if (length >= upperLength) {
            return;
        }
        if ((target.selectionStart !== null) && target.selectionStart !== value.length) {
            return;
        }
        if (card && card.type === 'amex') {
            re = /^(\d{4}|\d{4}\s\d{6})$/;
        } else {
            re = /(?:^|\s)(\d{4})$/;
        }
        if (re.test(value)) {
            e.preventDefault();
            return $ele.val(value + ' ' + digit);
        } else if (re.test(value + digit)) {
            e.preventDefault();
            return $ele.val(value + digit + ' ');
        }
    }

    function formatBackCardNumber($ele, e) {
        var target, value;
        target = e.target;
        value = $ele.val();
        if (e.meta) {
            return;
        }
        if (e.which !== 8) {
            return;
        }
        if ((target.selectionStart !== null) && target.selectionStart !== value.length) {
            return;
        }
        if (/\d\s$/.test(value)) {
            e.preventDefault();
            return $ele.val(value.replace(/\d\s$/, ''));
        } else if (/\s\d?$/.test(value)) {
            e.preventDefault();
            return $ele.val(value.replace(/\s\d?$/, ''));
        }
    }

    ui.bank = function(selector) {
        var $selector = $(selector);
        if ($selector && $selector.length > 0) {

            $selector.keypress(function(evt) {
                restrictCardNumber($(this), normalizeEvent(evt));
            });
            $selector.keypress(function(evt) {
                formatCardNumber($(this), normalizeEvent(evt));
            });

            $selector.keydown(function(evt) {
                formatBackCardNumber($(this), normalizeEvent(evt));
            });
        }
    };
}(window.Zepto, window.Zepto.ui || {}));
