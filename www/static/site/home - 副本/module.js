define('home - 副本/module', function(require, exports, module) {

  /**
   * 模块相关操作
   * @method
   * @param  {[type]} function( [description]
   * @return {[type]}           [description]
   */
  var block = (function() {
    var $ = require('jquery');
    var tools = require('pizzatools');
    var common = require('common/common');
    var my = {};
    var options = {
      url: '/home/block/',
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
  var __stack = { lineno: 1, input: "<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n  <li>\r\n    <label class=\"checkgroup\">\r\n      <input type=\"checkbox\" id=\"block_<%= data[i].id%>\" name=\"checkall\"><label for=\"block_<%= data[i].id%>\" class=\"check-all\"></label>\r\n    </label>\r\n    <a href=\"javascript:void(0);\"><%= data[i].title%></a>\r\n    <span><a href=\"/block/edit?id=<%= data[i].id%>\">编辑</a><i class=\"remove\">删除</i></span>\r\n  </li>\r\n<%}%>\r\n", filename: "site/home - 副本/ejs/block.ejs" };
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
   buf.push('');__stack.lineno=1;for(var i=0,ll=data.length; i<ll; i++) { ; buf.push('\n  <li>\n    <label class="checkgroup">\n      <input type="checkbox" id="block_', escape((__stack.lineno=4,  data[i].id)), '" name="checkall"><label for="block_', escape((__stack.lineno=4,  data[i].id)), '" class="check-all"></label>\n    </label>\n    <a href="javascript:void(0);">', escape((__stack.lineno=6,  data[i].title)), '</a>\n    <span><a href="/block/edit?id=', escape((__stack.lineno=7,  data[i].id)), '">编辑</a><i class="remove">删除</i></span>\n  </li>\n');__stack.lineno=9;}; buf.push('\n'); })();
  } 
  return buf.join('');
  } catch (err) {
    rethrow(err, __stack.input, __stack.filename, __stack.lineno);
  }
  }][0],
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
              editor.html(msg.msg.content);
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
              'minLength': 5,
              'maxLength': 48,
              focusMsg: "请输入标题",
              errMsg: '标题不能为空或标题必须在5-48个字符之间'
            }
          },
          ajaxFun: function(data) {
            var id = tools.getPara("id");
            var op = "create";
            if (id != "") {
              op = "update";
              data += "&id=" + id;
            }
            data += '&content=' + editor.html()
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
          var s = options.tpl({
            data: msg.msg
          });
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
              $('#block_' + ids[i]).parent().parent().remove();
            }
          }
        }
      });
    }
  
  
    return my;
  }());
  
  module.exports = block;
  

});
