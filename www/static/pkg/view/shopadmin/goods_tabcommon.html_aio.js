/*!shopadmin/goods/goods*/
;define('shopadmin/goods/goods', function(require, exports, module) {

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
  
  

});

/*!shopadmin/pinpai/pinpai*/
;define('shopadmin/pinpai/pinpai', function(require, exports, module) {

  /**
   * 模块相关操作
   * @method
   * @param  {[type]} function( [description]
   * @return {[type]}           [description]
   */
  var pinpai = (function() {
    var $ = require('jquery');
    var tools = require('pizzatools');
    var common = require('common/common');
    var my = {};
    var options = {
      url: '/shopadmin/pinpai/',
      tpl: "<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n  <li>\r\n    <label class=\"checkgroup\">\r\n      <input type=\"checkbox\" id=\"pinpai_<%= data[i].id%>\" name=\"checkall\"><label for=\"pinpai_<%= data[i].id%>\" class=\"check-all\"></label>\r\n    </label>\r\n    <a href=\"<%= data[i].link%>\" target=\"_blank\"><%= data[i].title%></a>\r\n    <span><a href=\"./pinpai/edit?id=<%= data[i].id%>\">编辑</a><i class=\"remove\">删除</i></span>\r\n  </li>\r\n<%}%>\r\n",
      cp: 1,
      mp: 20
    };
    var isScroll = true;
  
    /**
     * 初始化执行函数
     * @method function
     * @return {[type]} [description]
     */
    my.init = function() {
        eventBind(); //绑定所有交互操作
        page(1); //
        scrollEvent(); //绑定滚动条事件
        common.checkAll('#checkall'); //checkall
        common.kwSearch('#searchkw', function() {
          page(1);
        });
      }
      /**
       * 编辑模块
       * @method function
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
    my.get = function() {
        var id = tools.getPara("id");
        if (id == "") {
          return;
        }
        $.ajax({
          url: options.url + 'get',
          data: 'id=' + id,
          success: function(msg) {
            if (msg.state == true) {
              for (var key in msg.msg) {
                $('#' + key).val(msg.msg[key]);
              }
            }
          }
        });
      }
      /**
       * 编辑模块
       * @method function
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
    my.edit = function(obj) {
        $(".form").pizzaValidate({
          'fields': {
            '#title': {
              'must': true,
              'minLength': 2,
              'maxLength': 48,
              focusMsg: "请输入标题",
              errMsg: '标题不能为空或标题必须在2-48个字符之间'
            },
            '#logo': {
              'must': false,
              'minLength': 2,
              'maxLength': 100,
              focusMsg: "请上传logo。非必填",
              errMsg: 'logo必须在2-100个字符之间'
            },
            '#link': {
              'must': false,
              'minLength': 2,
              'maxLength': 100,
              focusMsg: "请输入品牌网址",
              errMsg: '网址必须在2-100个字符之间'
            },
            '#brief': {
              'must': false,
              'minLength': 2,
              'maxLength': 1000,
              focusMsg: "请输入描述",
              errMsg: '描述必须在2-1000个字符之间'
            },
            '#weight': {
              'must': true,
              'minLength': 1,
              'maxLength': 4,
              "reg":"int",
              focusMsg: "请输入标题",
              errMsg: '权重不能为空且必须在1-4位自然数'
            }
          },
          ajaxFun: function(data) {
            var id = tools.getPara("id");
            var op = "create";
            if (id != "") {
              op = "update";
              data += "&id=" + id;
            }
            $.ajax({
              url: options.url + op,
              data: data,
              success: function(msg) {
                if (msg.state == true) {
                  history.back();
                }
              }
            });
          }
        });
      }
      /**
       * 获取所有的品牌
       * @method function
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
      my.pageAll = function(callback) {
        $.ajax({
          url: options.url + 'pageall',
          data: 'cp=1',
          success: function(msg) {
            callback(msg);
          }
        });
      }
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
        success: function(msg) {
          let s = new EJS({text: options.tpl}).render({data: msg.msg});
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
      $('#list').on('click', 'li > span > i', function() {
        var cl = $(this).attr('class');
        console.log(cl);
        if (cl) {
          action[cl].call(this, $(this));
        }
      });
      $('#main > div.menu').on('click', 'em', function() {
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
      $(window).scroll(function() {
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
    action.remove = function(obj) {
      var id = common.getCheckId(obj);
      console.log(id);
      if (id == '0') {
        return;
      }
      $.ajax({
        url: options.url + 'remove',
        data: 'id=' + id,
        success: function(msg) {
          if (msg.state == true) {
            var ids = id.split(',');
            for (var i = 0, ll = ids.length; i < ll; i++) {
              $('#pinpai_' + ids[i]).parent().parent().remove();
            }
          }
        }
      });
    }
  
  
    return my;
  }());
  
  module.exports = pinpai;
  

});

/*!shopadmin/tree/tree*/
;define('shopadmin/tree/tree', function(require, exports, module) {

  /**
   * 模块相关操作
   * @method
   * @param  {[type]} function( [description]
   * @return {[type]}           [description]
   */
  var tree = (function() {
    var $ = require('jquery');
    var tools = require('pizzatools');
    var common = require('common/common');
    var my = {};
    var options = {
      url: '/shopadmin/goodstree/',
      tpl: "<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n    <li class=\"pid<%= data[i].pid%>\" path=\"<%= data[i].nodepath%>\" id=\"<%= data[i].id%>\">\r\n      <%var deep = data[i].nodepath.split(',').length - 3 %>\r\n      <%for(var j=0;j<deep;j++) {%>\r\n        <b class=\"indent\"></b>\r\n      <%}%>\r\n      <i class=\"icon-add\"></i>\r\n      <em><%= data[i].name%></em>\r\n      <i>display:1</i>\r\n      <span><a href=\"/shopadmin/goodstree/edit?id=<%= data[i].id%>\">编辑</a><a href=\"/shopadmin/goodstree/edit?pid=<%= data[i].id%>\">添加子节点</a></span>\r\n    </li>\r\n<%}%>\r\n"
    };
  
    /**
     * 初始化执行函数
     * @method function
     * @return {[type]} [description]
     */
    my.init = function() {
        eventBind(); //绑定所有交互操作
        page(1);
      }
      /**
       * 编辑模块
       * @method function
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
    my.get = function() {
        var id = tools.getPara("id");
        if (id == "") {
          return;
        }
        $.ajax({
          url: options.url + 'get',
          data: 'id=' + id,
          success: function(msg) {
            console.log(msg.state == true);
            if (msg.state == true) {
              for (var key in msg.msg) {
                $('#' + key).val(msg.msg[key]);
              }
              editor.html(msg.msg.brief);
            }
          }
        });
      }
      /**
       * 编辑模块
       * @method function
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
    my.edit = function(obj) {
      $(".form").pizzaValidate({
        'fields': {
          '#name': {
            'must': true,
            'minLength': 2,
            'maxLength': 48,
            focusMsg: "请输入标题",
            errMsg: '标题不能为空或标题必须在2-48个字符之间'
          },
          '#link': {
            'must': false,
            'minLength': 5,
            'maxLength': 150,
            focusMsg: "请输入自定义链接(非必填)",
            errMsg: '自定义链接须在5-150个字符之间'
          },
          '#weight': {
            'must': true,
            'minLength': 1,
            'maxLength': 3,
            focusMsg: "请输入节点权重",
            errMsg: '请输入节点权重，只能是小于4位的数字'
          }
  
        },
        ajaxFun: function(data) {
          var id = tools.getPara("id");
          var pid = tools.getPara('pid');
          var op = "create";
          if (id != "") {
            op = "update";
            data += '&id=' + id;
          } else {
            data += '&pid=' + pid;
          }
          data += '&brief=' + editor.html()
          $.ajax({
            url: options.url + op,
            data: data,
            success: function(msg) {
              if (msg.state == true) {
                history.back();
              }
            }
          });
        }
      });
    }
  /**
   * 获取所有分类
   * @method function
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
    my.pageall = function(callback) {
        $.ajax({
          url: options.url + 'pageall',
          success: function(msg) {
            if (msg.state == true) {
              var s = '<option value="1">全部分类</option>';
              var data = msg.msg;
              s += fomatNodeList(1, data);
              callback(s);
            }
          }
        })
      }
      /**
       * 递归格式化nodelist
       * @method fomatNodeList
       * @param  {[type]}      pid  [description]
       * @param  {[type]}      data [description]
       * @return {[type]}           [description]
       */
    function fomatNodeList(pid, data) {
      var s = '';
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].pid == pid + "") {
          s += '<option value="' + data[i].id + '">' + setNodeListGap(data[i].nodepath) + data[i].name + '</option>';
          s += fomatNodeList(data[i].id, data);
        }
      }
      return s;
    }
    /**
     * fomat nodelist 添加制表符
     * @method setNodeListGap
     * @param  {[type]}       nodepath [description]
     */
    function setNodeListGap(nodepath) {
      var l = nodepath.split(',').length - 3;
      var s = '';
      if (l == 0) {
        return s;
      } else {
        s += '├'
        for (var i = 0; i < l; i++) {
          s += '─ ';
        }
        return s;
      }
    }
    /**
     * 获取模块列表
     * @method page
     * @return {[type]} [description]
     */
    function page(pid) {
      var o = $('#' + pid);
      $.ajax({
        url: options.url + 'page',
        data: 'pid=' + pid,
        success: function(msg) {
          let s = new EJS({text: options.tpl}).render({data: msg.msg});
          o.after(s);
        }
      });
    }
    /**
     * 操作事件绑定
     * @method eventBind
     * @return {[type]}  [description]
     */
    function eventBind() {
      $('#treelist').on('click', 'li > i', function() {
        var o = $(this);
        var cl = o.attr('class');
        var oparent = o.parent();
        var id = oparent.attr('id');
        var subli = $('.pid' + id);
  
        if (cl.indexOf('icon-add') > -1) { //展开子集
          o.removeClass('icon-add').addClass('icon-sub');
          if (subli.length > 0) {
            subli.removeClass('display');
          } else {
            page(id);
          }
        } else { //缩回子集
          o.removeClass('icon-sub').addClass('icon-add');
          displaySubNode(oparent, 'hide');
        }
      });
    }
    /**
     * 显示或者隐藏所有子节点
     * @method displaySubNode
     * @param  {[type]}       pidObj [description]
     * @return {[type]}              [description]
     */
    function displaySubNode(pidObj, isdisplay) {
      var node = pidObj.nextAll();
      var nodepath = pidObj.attr('path');
      var subnode;
      var action = {};
      action.show = function(obj) {
        console.log(obj);
        obj.removeClass('display');
      }
      action.hide = function(obj) {
        obj.addClass('display');
        obj.children('i').removeClass('icon-sub').addClass('icon-add');
      }
  
      node.each(function() {
        subnode = $(this);
        if ($(this).attr('path').indexOf(nodepath) > -1) {
          action[isdisplay].call(this, subnode);
        }
      });
    }
  
  
    return my;
  }());
  
  module.exports = tree;
  

});

