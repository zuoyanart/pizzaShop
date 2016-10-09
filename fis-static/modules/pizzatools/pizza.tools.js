/**
 * --------------------------------------------------------
 * witch js 工具类，包含前台字符串、cookie、图片缩放，特殊字符过滤等操作
 * @Version 0.5
 * @Author: 左盐(huabinglan@163.com)
 * @Date: 14-2-12 下午3:16
 * --------------------------------------------------------
 */
var $ = jQuery = require('jquery');
var pizzalayer = require('pizzalayer');
var tools = new function() {
  _self = this;
  _self.randomChar = function(l) { //获取l位随机数
      var x = "0123456789qwertyioplkjhgfsazxcvbnm";
      var tmp = "";
      for (var i = 0; i < l; i++) {
        tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
      }
      return tmp;
    }
    /**
     * 弹窗获取随机数，防止缓存
     * @return {[type]} [description]
     */
  _self.formRandom = function() {
      return new Date().getTime();
    }
    /**
     * 获取字符串长度，区分中英文
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
  _self.getCharLen = function(str) { //获取字符串长度，区分中英文
      return str.replace(/[^\x00-\xff]/g, "rr").length;
    }
    /**
     * //图片上下居中，I：img对象，l相框高度
     * @param  {[type]} I [description]
     * @param  {[type]} l [description]
     * @return {[type]}   [description]
     */
  _self.imgCenter = function(I, l) {
    var i = new Image();
    i.src = I.src;
    var h = i.height;
    if (h > 0) {
      var mt = (l - h) / 2;
      $(I).css("margin-top", mt);
    }
  }

  _self.subStr = function(s, l, st) { //截取字符串，区分中英文
    var T = false;
    if (tools.getCharLen(s) > l) {
      st = st ? st : '';
      l -= tools.getCharLen(st);
      var S = escape(s);
      var M = S.length;
      var r = '';
      var C = 0;
      for (var i = 0; i < M; i++) {
        if (C < l) {
          var t = S.charAt(i);
          if (t == '%') {
            t = S.charAt(i + 1);
            if (t == 'u') {
              r += S.substring(i, i + 6);
              C += 2;
              i += 5;
            } else {
              r += S.substring(i, i + 3);
              C++;
              i += 2;
            }
          } else {
            r += t;
            C++;
          }
        } else {
          T = true;
          break;
        }
      }
    }
    return T ? unescape(r) + st : s;
  }

  _self.xss = function(siteurl, options) { //前端过滤
    var defaults = {
      removeHtml: true, //清除html标签
      removeEnter: true //移除换行
    };

    var options = $.extend(defaults, options);

    siteurl = siteurl.replace(/<(script|link|style|iframe)(.|\n)*\/\1>\s*/ig, ""); //过滤危险标签
    siteurl = siteurl.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    siteurl = siteurl.replace(/"/g, '”').replace(/"/g, "“"); //替换英文引号为中文引号
    siteurl = siteurl.replace(/\'/g, "‘"); //替换英文单引号为中文单引号

    if (options.removeHtml == true) {
      siteurl = siteurl.replace(/<\/?(?!br|\/)[^>]*>/g, ''); //去除HTML tag//(/<\/?(?!br|/?p|img)[^>]*>/g,'');
    }
    if (options.removeEnter == true) {
      siteurl = siteurl.replace(/(\n)/g, "").replace(/(\t)/g, "").replace(/(\r)/g, ""); //过滤回车
    } else {
      siteurl = siteurl.replace(/(\n)/g, "<br/>").replace(/(\t)/g, "").replace(/(\r)/g, "<br/>"); //过滤回车
    }

    return siteurl;
  }

  _self.getPara = function(name) { //获取url的参数
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return '';
  }

  _self.subTime = function(time1, time2) { //计算时间差time2-time1，返回时间差的毫秒数
    var t1 = new Date(time1),
      t2;
    if (time2 == undefined) {
      t2 = new Date(); //当前时间
    } else {
      t2 = new Date(time2);
    }
    return (t2.getTime() - t1.getTime()) / 1000; //时间差的秒数
  }

  //时间格式化
  _self.formatTime = function(fmt) { // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
      var t = new Date();
      var o = {
        "M+": t.getMonth() + 1, //月份
        "d+": t.getDate(), //日
        "h+": t.getHours(), //小时
        "m+": t.getMinutes(), //分
        "s+": t.getSeconds(), //秒
        "q+": Math.floor((t.getMonth() + 3) / 3), //季度
        "S": t.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    /**
     * 根据objectid获取时间
     * @param  {[type]} ObjectId [description]
     * @param  {[type]} fmt      [description]
     * @return {[type]}          [description]
     */
  _self.getObjectIdTime = function(ObjectId, fmt) {
      var time = parseInt(ObjectId.substring(0, 8), 16);
      var t = new Date(time * 1000);
      var o = {
        "M+": t.getMonth() + 1, //月份
        "d+": t.getDate(), //日
        "h+": t.getHours(), //小时
        "m+": t.getMinutes(), //分
        "s+": t.getSeconds(), //秒
        "q+": Math.floor((t.getMonth() + 3) / 3), //季度
        "S": t.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    /**
     * 整站使用到的基础数据
     * @type {Object}
     */
  _self.siteData = {
    url: {
      avatar: 'http://avatar.ssllff.com',
      photo: 'http://photo.ssllff.com',
      say: 'http://say.ssllff.com',
      needimg: 'http://needimg.mcren.net'
    },
    data: {
      know: ["高中", "中专", "大专", "学士", "硕士", "博士", "博士后"],
      estimate: [2, 1.5, 1, -1.3],
      need: {
        0: '自我推荐',
        1: '求职',
        2: '招聘',
        3: '实体店-销售促销',
        4: '电商-微商-销售',
        5: '公司形象宣传',
        6: '技术/学术交流',
        7: '主题社交',
        8: '商务合作',
        9: '教育-培训-会议',
        10: '汽车/地产销售',
        11: '生活需求/服务',
        12: '医疗需求/服务',
        13: '创业',
        14: '众筹-投融资-理财'
      }
    }
  };

  //打印占位符
  //up down 分别对应占位符上下两段话
  /**
   * [ho打印占位符
   * @param  {[type]} title  占位符的标题
   * @param  {[type]} des   占位符上的描述
   * @return {[type]}       占位符
   */
  _self.holdSpace = function(title, des) {
      return '<div class="hold-space"><p class="title">' + title + '</p><p class="des">' + des + '</p></div>';
    }
    /**
     * 获取cookie
     * @param  {[type]} c    [description]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
  _self.getCookie = function(name) {
      var v = "0";
      var t = document.cookie;
      var us = t.split(';');
      for (var i = 0; i < us.length; i++) {
        if ($.trim(us[i].split('=')[0]) == name) {
          v = decodeURIComponent(us[i].split('=')[1]);
          break;
        }
      }
      return v;
    }
    //设置cookie，不推荐使用，请在服务器端设置cookie，如需本地存储，请使用本地化存储插件pizza.ui.store.js
  _self.setCookie = function(c, s, d) {
      var v = c + '=' + s;
      v += d ? '; max-age=' + (d * 24 * 60 * 60) : '';
      document.cookie = v + ";path=/;";
    }
    /**
     * 书架csrf参数
     * @param  {[type]} option [description]
     * @return {[type]}        [description]
     */
  _self.getCsrf = function(options) {
    var defaults = {
      _csrf: '',
      isparent: false
    }
    options = $.extend(defaults, options);
    if (options.isparent === true) {
      return '&_csrf=' + parent.$('#csrf').val();
    }
    return '&_csrf=' + $('#csrf').val();
  }
  /**
   * 除法运算，算得精确结果
   * @method function
   * @param  {[type]} arg1 [description]
   * @param  {[type]} arg2 [description]
   * @return {[type]}      [description]
   */
  _self.accDiv = function(arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {}
    with(Math) {
      r1 = Number(arg1.toString().replace(".", ""))
      r2 = Number(arg2.toString().replace(".", ""))
      return (r1 / r2) * pow(10, t2 - t1);
    }
  }
}
module.exports = tools;
