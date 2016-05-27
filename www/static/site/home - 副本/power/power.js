define('home - 副本/power/power', function(require, exports, module) {

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
      url: '/home/tree/',
      tpl: [function(locals, filters, escape, rethrow
  /**/) {
  escape = escape || function (html){
    return String(html)
      .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#39;')
      .replace(/"/g, '&quot;');
  };
  var __stack = { lineno: 1, input: "<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n    <li class=\"pid<%= data[i].pid%>\" path=\"<%= data[i].nodepath%>\" id=\"<%= data[i].id%>\">\r\n      <%var deep = data[i].nodepath.split(',').length - 3 %>\r\n      <%for(var j=0;j<deep;j++) {%>\r\n        <b class=\"indent\"></b>\r\n      <%}%>\r\n      <i class=\"icon-add\"></i>\r\n      <em><%= data[i].name%></em>\r\n      <span><a href=\"/home/tree/edit?id=<%= data[i].id%>\">编辑</a><a href=\"/home/tree/edit?pid=<%= data[i].id%>\">添加子节点</a></span>\r\n    </li>\n<%}%>\r\n", filename: "site/home - 副本/ejs/tree.ejs" };
  function rethrow(err, str, filename, lineno){
    var lines = str.split('\n')
      , start = Math.max(lineno - 3, 0)
      , end = Math.min(lines.length, lineno + 3);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? ' >> ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'ejs') + ':'
      + lineno + '\n'
      + context + '\n\n'
      + err.message;
    
    throw err;
  }
  try {
  var buf = [];
  with (locals || {}) { (function(){ 
   buf.push('');__stack.lineno=1;for(var i=0,ll=data.length; i<ll; i++) { ; buf.push('\n    <li class="pid', escape((__stack.lineno=2,  data[i].pid)), '" path="', escape((__stack.lineno=2,  data[i].nodepath)), '" id="', escape((__stack.lineno=2,  data[i].id)), '">\n      ');__stack.lineno=3;var deep = data[i].nodepath.split(',').length - 3 ; buf.push('\n      ');__stack.lineno=4;for(var j=0;j<deep;j++) {; buf.push('\n        <b class="indent"></b>\n      ');__stack.lineno=6;}; buf.push('\n      <i class="icon-add"></i>\n      <em>', escape((__stack.lineno=8,  data[i].name)), '</em>\n      <span><a href="/home/tree/edit?id=', escape((__stack.lineno=9,  data[i].id)), '">编辑</a><a href="/home/tree/edit?pid=', escape((__stack.lineno=9,  data[i].id)), '">添加子节点</a></span>\n    </li>\n');__stack.lineno=11;}; buf.push('\n'); })();
  } 
  return buf.join('');
  } catch (err) {
    rethrow(err, __stack.input, __stack.filename, __stack.lineno);
  }
  }][0]
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
  
    my.pageall = function(callback) {
        $.ajax({
          url: options.url + 'pageall',
          success: function(msg) {
            if (msg.state == true) {
              var s = '<option value="1">首页</option>';
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
          var s = options.tpl({
            "data": msg.msg
          });
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
