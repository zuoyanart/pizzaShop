define('shopadmin/goods/goods', function(require, exports, module) {

  /**
   * 模块相关操作
   * @method
   * @param  {[type]} function( [description]
   * @return {[type]}           [description]
   */
  'use strict';
  
  var goods = (function () {
    var $ = require('jquery');
    var tools = require('pizzatools');
    var common = require('common/common');
    var my = {};
    var options = {
      url: '/shopadmin/goods/',
      tpl: "<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n  <li>\r\n    <label class=\"checkgroup\">\r\n      <input type=\"checkbox\" id=\"goods_<%= data[i].id%>\" name=\"checkall\"><label for=\"goods_<%= data[i].id%>\" class=\"check-all\"></label>\r\n    </label>\r\n    <a target=\"_blank\"><%= data[i].catname%></a>\r\n    <span><a href=\"/shopadmin/goodsattr/?catid=<%= data[i].id%>&catname=<%= escape(data[i].catname)%>\">属性列表</a><a href=\"./goods/edit?id=<%= data[i].id%>\">编辑</a><i class=\"remove\">删除</i></span>\r\n  </li>\r\n<%}%>\r\n",
      cp: 1,
      mp: 20
    };
    var isScroll = true;
  
    /**
     * 初始化执行函数
     * @method function
     * @return {[type]} [description]
     */
    my.init = function () {
      eventBind(); //绑定所有交互操作
      page(1); //
      scrollEvent(); //绑定滚动条事件
      common.checkAll('#checkall'); //checkall
      common.kwSearch('#searchkw', function () {
        page(1);
      });
    };
    /**
     * 编辑模块
     * @method function
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    my.get = function (tab) {
      var id = tools.getPara("id");
      if (id == "") {
        return;
      }
      $.ajax({
        url: options.url + 'get' + tab,
        data: 'id=' + id,
        success: function success(result) {
          if (result.state == true) {
            for (var key in result.msg) {
              $('#' + key).val(result.msg[key]);
            }
          }
        }
      });
    };
  
    /**
     * 编辑模块
     * @method function
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    my.edit = function (obj) {
      $(".form").pizzaValidate({
        'fields': {
          '#catname': {
            'must': true,
            'minLength': 1,
            'maxLength': 20,
            focusMsg: "请输入商品类型名称",
            errMsg: '标题不能为空或标题必须在1-20个字符之间'
          }
        },
        ajaxFun: function ajaxFun(data) {
          var id = tools.getPara("id");
          var op = "create";
          if (id != "") {
            op = "update";
            data += "&id=" + id;
          }
          $.ajax({
            url: options.url + op,
            data: data,
            success: function success(msg) {
              if (msg.state == true) {
                history.back();
              }
            }
          });
        }
      });
    };
    /**
     * 获取模块列表
     * @method page
     * @return {[type]} [description]
     */
    function page(cp, mp) {
      if (cp) {
        options.cp = cp;
      }
      $.ajax({
        url: options.url + 'page',
        data: 'cp=' + options.cp + '&mp=' + options.mp + '&kw=' + $.trim($('#searchkw').val()),
        success: function success(msg) {
          var s = new EJS({ text: options.tpl }).render({ data: msg.msg });
          if (cp == 1) {
            $('#list').html(s);
          } else {
            $('#list').append(s);
          }
          options.cp += 1;
          isScroll = true;
        }
      });
    }
    /**
     * 操作事件绑定
     * @method eventBind
     * @return {[type]}  [description]
     */
    function eventBind() {
      $('#list').on('click', 'li > span > i', function () {
        var cl = $(this).attr('class');
        console.log(cl);
        if (cl) {
          action[cl].call(this, $(this));
        }
      });
      $('#main > div.menu').on('click', 'em', function () {
        var cl = $(this).attr('class');
        if (cl) {
          action[cl].call(this, $(this));
        }
      });
    }
    /**
     * 滚动条滚动事件
     * @method scrollEvent
     * @return {[type]}    [description]
     */
    function scrollEvent() {
      $(window).scroll(function () {
        var docHeight = document.body.scrollHeight;
        var scrollTop = 0; //滚动条高度
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        var bottomHeight = docHeight - scrollTop - $(window).height();
        //console.log(bottomHeight);
        //console.log(isScroll);
        if (bottomHeight < 100 && isScroll == true) {
          page();
          isScroll = false;
        }
      });
    }
    /////action
    var action = {};
    /**
     *
     * @method remove
     * @return {[type]} [description]
     */
    action.remove = function (obj) {
      var id = common.getCheckId(obj);
      console.log(id);
      if (id == '0') {
        return;
      }
      $.ajax({
        url: options.url + 'remove',
        data: 'id=' + id,
        success: function success(msg) {
          if (msg.state == true) {
            var ids = id.split(',');
            for (var i = 0, ll = ids.length; i < ll; i++) {
              $('#goods_' + ids[i]).parent().parent().remove();
            }
          }
        }
      });
    };
  
    return my;
  })();
  
  module.exports = goods;
  //# sourceMappingURL=/static/site/shopadmin/goods/goods.js.map
  

});
