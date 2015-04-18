(function ($) {
  'use strict';

  var _methods = {
    minLength: function (val, length) {
      return val.length >= length;
    },
    maxLength: function (val, length) {
      return val.length <= length;
    },
    equal: function (val1, val2) {
      return (val1 === val2);
    },
    special: function (val) {
      return !!(val.match(/[^\x00-\xff]/g) && val.match(/[^\x00-\xff]/g).length / val.length > 0.1) && !/[(\u5bf9\u9762)|(\u95e8\u53e3)|(\u65c1\u8fb9)|(\u9694\u58c1)|(\u9644\u8fd1)|(\u4ea4\u53c9\u53e3)|(\u4e4b\u95f4)|(\u5341\u5b57\u8def\u53e3)|(\u81ea\u63d0\u70b9)|(\u81ea\u63d0)]+$/gi.test(val) && !/[\uff41-\uff5a]/.test(val);
    },
    bankCard: function(code) {
         code = $.trim(code);
         var lastNum = code.substr(code.length - 1, 1); //取出最后一位（与luhm进行比较）
         code = $.trim(code.replace(/\s/ig, ''));
         if (code.length < 15) {
            return false;
         } else if (code.length > 19) {
            return false;
         }
         lastNum = code.substr(code.length - 1, 1); //取出最后一位（与luhm进行比较）
         var first15Num = code.substr(0, code.length - 1); //前15或18位
         var newArr = [];
         for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
            newArr.push(first15Num.substr(i, 1));
         }
         var arrJiShu = [], //奇数位*2的积 <9
            arrJiShu2 = [], //奇数位*2的积 >9
            arrOuShu = []; //偶数位数组

         for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 === 1) { //奇数位
               if (parseInt(newArr[j]) * 2 < 9) {
                  arrJiShu.push(parseInt(newArr[j]) * 2);
               } else {
                  arrJiShu2.push(parseInt(newArr[j]) * 2);
               }
            } else { //偶数位
               arrOuShu.push(newArr[j]);
            }
         }

         var jishuChild1 = []; //奇数位*2 >9 的分割之后的数组个位数
         var jishuChild2 = []; //奇数位*2 >9 的分割之后的数组十位数
         for (var h = 0; h < arrJiShu2.length; h++) {
            jishuChild1.push(parseInt(arrJiShu2[h]) % 10);
            jishuChild2.push(parseInt(arrJiShu2[h]) / 10);
         }
         var sumJiShu = 0; //奇数位*2 < 9 的数组之和
         var sumOuShu = 0; //偶数位数组之和
         var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
         var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
         var sumTotal = 0;
         for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
         }
         for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
         }
         for (var p = 0; p < jishuChild1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChild1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChild2[p]);
         }
         //totle
         sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
         //Luhm value
         var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10;
         var luhm = 10 - k;
         if (lastNum === $.toString(luhm)) {
            return true;
         } else {
            return false;
         }
      }
  };

  $.validationMethods = _methods;
}(window.Zepto));