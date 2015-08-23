/**
 * Created by hejun on 15/8/23.
 *音乐控制
 *方法名称： tp.util
 */
(function (window, namespace, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        if (define.amd) {
            // AMD 规范，for：requirejs
            define(function () {
                return factory();
            });
        } else if (define.cmd) {
            // CMD 规范，for：seajs
            define(function (require, exports, module) {
                module.exports = factory();
            });
        }
    } else {
        window.tp = window.tp || {};
        window.tp[namespace] = factory();
    }
})(window, 'util', function () {

    var utils = {
        version: '0.0.1'
    };
    //判断手机号码正确性
    utils.ismobile = function (s) {
        var p = /^(013|015|13|15|018|18)\d{9}$/;
        if (s.match(p) != null) {
            return true;
        }
        return false;
    };
    //检查是否中文字符
    utils.is_zw = function (str) {
        exp = /[0-9a-zA-Z_.,#@!$%^&*()-+=|\?/<>]/g;
        if (str.search(exp) != -1) {
            return false;
        }
        return true;
    };
    //验证是否包含逗号
    utils.CheckBadChar = function (Obj, AlertStr) {
        exp = /[,，]/g;
        if (Obj.value.search(exp) != -1) {
            alert(AlertStr + "不能包含逗号");
            Obj.value = "";
            Obj.focus();
            return false;
        }
        return true;
    };
    //检查是否数字方法一
    utils.is_number = function (a) {
        return !isNaN(a)
    };
    //检查数字方法二
    utils.CheckNumber = function (Obj, DescriptionStr) {
        if (Obj.value != '' && (isNaN(Obj.value) || Obj.value < 0)) {
            alert(DescriptionStr + "应填有效数字！");
            Obj.value = "";
            Obj.focus();
            return false;
        }
        return true;
    };
    //检查电子邮件有效性
    utils.is_email = function (str) {
        if ((str.indexOf("@") == -1) || (str.indexOf(".") == -1)) {
            return false;
        }
        return true;
    };
    //检查日期格式是否为2008-01-01 13:01:01
    utils.is_date = function (str) {
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var r = str.match(reg);
        if (r == null)return is_shortdate(str);
        var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        var v = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
        if (v == false)
            return is_shortdate(str)
        else
            return true;
    };
////检查日期格式是否为2008-01-01
    utils.is_shortdate = function (str) {
        var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null)return false;
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    };


    /**
     * 异步加载js
     * @param url
     * @param callback
     */
    utils.loadScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" ||
                    script.readyState == "complete") {
                    script.onreadystatechange = null;
                    typeof (callback) === "function" && callback();
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera
            script.onload = function () {
                typeof (callback) === "function" && callback();
            };
        }
        script.src = url;
        document.body.appendChild(script);
    };
    /**
     * 对象扩展
     * @param target
     * @param source
     * @returns {}
     */
    utils.extend = function (target, source) {
        target = target || {};
        var result = {};
        for (var p in target) {
            if (source.hasOwnProperty(p)) {
                result[p] = source[p];
            } else {
                result[p] = target[p];
            }
        }
        return result;
    };
    return utils;
});

