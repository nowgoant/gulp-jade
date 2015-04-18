/**
 * Created by majun1 on 2015/3/2.
 */

(function($) {
    'use strict';

    $.mgs = {
        noAuth: '小伙伴,您无权访问',
        auth: '身份验证失败',
        error: '系统繁忙,小伙伴请稍后再试！',
        noData: '没有数据返回',
        noNet: '网络连接出问题了，请稍后重试!',
        verifyCode: '短信验证码',
        verifyCodeRule: '短信验证码必须是6位数字',
        sendVerify: '发送验证码',
        province: '省市区',
        address: '地址',
        addressRule: '输入的地址不符合法',
        save: '储蓄卡',
        credit: '信用卡',
        second: '秒',
        year: '年',
        month: '月',
        cvv: '卡验证码',
        phone: '手机号',
        card: '卡号',
        bankCard:'银行卡号格式不正确',
        seeBank: '查看支持银行',
        tipbtn: '我知道了',
        btnConfirm: '确定',
        btnCancel: '取消',
        stagRst: '分期确认失败',
        timerBtn: '重新发送',
        tailNum: '尾号',
        required: function(msg) {
            return '必须输入' + $.toString(msg);
        },
        rule: function(msg) {
            return '输入的' + $.toString(msg) + '不合法';
        },
        num: function(msg, num) {
            return $.toString(msg) + '必须是' + $.toString(num) + '位数字';
        },
        creditLable: '请输入信用卡背面末三位数字',
        creditTitle: '输入卡验证码',
        cvvNum: '3位数字',
        smsTitle: function(msg) {
            return '完成并支付' + $.toString(msg) + '元';
        },
        smsLable: function(phone) {
            return '输入手机' + $.mgs.tailNum + $.toString(phone) + '接收的短信验证码';
        }
    };

    // $.config = {

    // }
}(window.Zepto));
