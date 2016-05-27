/**
 * 网站全局配置
 * @method function
 * @return {[type]} [description]
 */
var globleConfig = (function() {
  var my = {};
  var $ = require('jquery');
  var tools = require('pizzatools');
  require('layer');
  var pizzalayer = require('pizzalayer');

/**
 * 初始化函数
 * @method function
 * @return {[type]} [description]
 */
  my.init = function() {
    lowerBrower(); // 如果小于 ie8，跳转到 ie.html
    ajaxGloble();
  }

  /**
   * 全局ajax函数
   * @return {[type]} [description]
   */
  function ajaxGloble() {
      $.ajaxSetup({
        global: true,
        type: "POST",
        dataType: 'json',
        timeout: 2000,
        beforeSend: function(req, opt) { //发送之前
          if (opt.type === 'POST') {
            /*if(opt.data === undefined) {
            	opt.data = tools.getCsrf();
            }*/
            if (opt.data && opt.data.indexOf('_csrf') === -1) {
              //opt.data += tools.getCsrf();
            }
          }
          layer.load(1);
        },
        complete: function() {
          layer.closeAll('loading');
        },
        error: function() {
          layer.closeAll('loading');
          layer.msg('网络错误，请稍后重试', {
            time: 1000
          });
        }
      });
    }
    // ie8 以下禁止访问本站
  function lowerBrower() {
    if (document.location.href.indexOf('ie.html') === -1) {
      var ie8 = /msie\s*8\.0/g.test(navigator.userAgent.toLowerCase());
      if (!$.support.leadingWhitespace && !ie8) {
        document.location.href = '/site/stop/ie.html?t=' + new Date().getTime();
        return;
      }
    }
  }

  return my;
}());

module.exports = globleConfig;
