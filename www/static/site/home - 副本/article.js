define('home - 副本/article', function(require, exports, module) {

  /**
   * 文章相关操作
   * @method
   * @param  {[type]} function( [description]
   * @return {[type]}           [description]
   */
  var article = (function() {
    var $ = require('jquery');
    var tools = require('pizzatools');
    var common = require('common/common');
    var node = require('home/tree/tree');
    var trunpage = require("trunpage/trunpage"); //获取翻页
    var pizzalayer = require("pizzalayer"); //获取翻页
    var tppage = null; //翻页的实例化
    var commentObj = null;
  
    require('pizzaui');
    var my = {};
    var options = {
      url: '/home/article/',
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
  var __stack = { lineno: 1, input: "<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n  <li>\r\n    <label class=\"checkgroup\">\r\n      <input type=\"checkbox\" id=\"article_<%= data[i].id%>\" name=\"checkall\"><label for=\"article_<%= data[i].id%>\" class=\"check-all\"></label>\r\n    </label>\r\n    <a href=\"\">[<%= data[i].nodename%>] <%= data[i].title%></a>\r\n    <% if(data[i].pass == 0){%>\r\n    <b>[未审核]</b>\r\n    <%}%>\r\n    <span><a href=\"/article/edit?id=<%= data[i].id%>\">编辑</a><i class=\"comment\">评论</i>\r\n      <% if(data[i].pass == 1){%>\r\n      <i class=\"pass\">取消审核</i>\r\n      <%} else {%>\r\n        <i class=\"pass\">审核</i>\r\n      <%}%>\r\n        <i class=\"remove\">删除</i></span>\r\n  </li>\r\n<%}%>\r\n", filename: "site/home - 副本/ejs/article.ejs" };
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
   buf.push('');__stack.lineno=1;for(var i=0,ll=data.length; i<ll; i++) { ; buf.push('\n  <li>\n    <label class="checkgroup">\n      <input type="checkbox" id="article_', escape((__stack.lineno=4,  data[i].id)), '" name="checkall"><label for="article_', escape((__stack.lineno=4,  data[i].id)), '" class="check-all"></label>\n    </label>\n    <a href="">[', escape((__stack.lineno=6,  data[i].nodename)), '] ', escape((__stack.lineno=6,  data[i].title)), '</a>\n    ');__stack.lineno=7; if(data[i].pass == 0){; buf.push('\n    <b>[未审核]</b>\n    ');__stack.lineno=9;}; buf.push('\n    <span><a href="/article/edit?id=', escape((__stack.lineno=10,  data[i].id)), '">编辑</a><i class="comment">评论</i>\n      ');__stack.lineno=11; if(data[i].pass == 1){; buf.push('\n      <i class="pass">取消审核</i>\n      ');__stack.lineno=13;} else {; buf.push('\n        <i class="pass">审核</i>\n      ');__stack.lineno=15;}; buf.push('\n        <i class="remove">删除</i></span>\n  </li>\n');__stack.lineno=18;}; buf.push('\n'); })();
  } 
  return buf.join('');
  } catch (err) {
    rethrow(err, __stack.input, __stack.filename, __stack.lineno);
  }
  }][0],
      cp: 1,
      mp: 20
    };
  
    var cmtOption = { //评论相关操作
      url: '/home/comment/',
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
  var __stack = { lineno: 1, input: "<ul class=\"list commentlist\">\r\n<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n  <li id=\"comment_<%= data[i].id%>\">\r\n    <a href=\"javascript:void(0);\"><%= data[i].content%></a>\r\n    <span><i class=\"commentRemove\">删除</i></span>\r\n  </li>\r\n<%}%>\r\n</ul>\r\n", filename: "site/home - 副本/ejs/comment.ejs" };
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
   buf.push('<ul class="list commentlist">\n');__stack.lineno=2;for(var i=0,ll=data.length; i<ll; i++) { ; buf.push('\n  <li id="comment_', escape((__stack.lineno=3,  data[i].id)), '">\n    <a href="javascript:void(0);">', escape((__stack.lineno=4,  data[i].content)), '</a>\n    <span><i class="commentRemove">删除</i></span>\n  </li>\n');__stack.lineno=7;}; buf.push('\n</ul>\n'); })();
  } 
  return buf.join('');
  } catch (err) {
    rethrow(err, __stack.input, __stack.filename, __stack.lineno);
  }
  }][0],
      cp: 1,
      mp: 10
    }
  
    var isScroll = true;
  
    /**
     * 初始化执行函数
     * @method function
     * @return {[type]} [description]
     */
    my.init = function() {
        eventBind(); //绑定所有交互操作
        scrollEvent(); //绑定滚动条事件
        common.checkAll('#checkall'); //checkall
        //绑定节点切换事件
  
        node.pageall(function(data) {
          var no = $('#node')
          no.html(data);
          no.pizzaSelect({
            onChange: function(obj) {
              page(1);
            }
          });
          page(1); //
        });
  
        common.kwSearch('#searchkw', function() {
          page(1);
        });
  
  
      }
      /**
       * 编辑文章
       * @method function
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
    my.get = function() {
        var id = tools.getPara("id");
        if (id == "") {
          node.pageall(function(data) {
            var no = $('#nodeid');
            no.html(data);
            no.pizzaSelect({});
            my.edit();
          });
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
              $('#pass').attr("val", msg.msg.pass);
              $('#reco').attr("val", msg.msg.reco);
              $('.select').pizzaSelect();
  
              node.pageall(function(data) {
                var no = $('#nodeid');
                no.attr('val', msg.msg.nodeid);
                no.html(data);
                no.pizzaSelect({});
                my.edit();
              });
              editor.html(msg.msg.content);
            }
          }
        });
      }
      /**
       * 编辑文章
       * @method function
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
    my.edit = function() {
        $(".form").pizzaValidate({
          'fields': {
            '#title': {
              'must': true,
              'minLength': 5,
              'maxLength': 48,
              focusMsg: "请输入标题",
              errMsg: '标题不能为空或标题必须在5-48个字符之间'
            },
            '#nodeid': {
              'must': true,
              'minLength': 1,
              'maxLength': 12,
              focusMsg: "请选择节点",
              errMsg: '请选择节点'
            },
            '#timg': {
              'must': false,
              'minLength': 1,
              'maxLength': 100,
              focusMsg: "请上传标题图片(非必填)",
              errMsg: '标题图须在1-100个字符之间'
            },
            '#link': {
              'must': false,
              'minLength': 8,
              'maxLength': 150,
              focusMsg: "请输入自定义链接(非必填)",
              errMsg: '自定义链接须在8-150个字符之间'
            },
            '#source': {
              'must': false,
              'minLength': 2,
              'maxLength': 30,
              focusMsg: "请输入文章来源(非必填)",
              errMsg: '文章来源须在2-30个字符之间'
            },
            '#brief': {
              'must': false,
              'minLength': 2,
              'maxLength': 300,
              focusMsg: "请输入文章描述(非必填)",
              errMsg: '文章描述须在2-300个字符之间'
            },
            '#tags': {
              'must': false,
              'minLength': 2,
              'maxLength': 30,
              focusMsg: "请输入文章标签，空格隔开(非必填)",
              errMsg: '文章标签须在2-30个字符之间'
            },
            '#pass': {
              'must': true,
              'minLength': 1,
              'maxLength': 3,
              focusMsg: " ",
              errMsg: ' '
            },
            '#reco': {
              'must': false,
              'minLength': 1,
              'maxLength': 3,
              focusMsg: " ",
              errMsg: ' '
            },
          },
          ajaxFun: function(data) {
            var id = tools.getPara("id");
            var op = "create";
            if (id != "") {
              op = "update";
              data += '&id=' + id;
            }
            data += '&content=' + editor.html();
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
       * 获取文章列表
       * @method page
       * @return {[type]} [description]
       */
    function page(cp, mp) {
      if (cp) {
        options.cp = cp;
      }
      $.ajax({
        url: options.url + 'page',
        data: 'cp=' + options.cp + '&mp=' + options.mp + '&kw=' + $.trim($('#searchkw').val()) + '&nodeid=' + $('#node').val(),
        success: function(msg) {
          var s = options.tpl({
            "data": msg.msg
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
                $('#article_' + ids[i]).parent().parent().remove();
              }
            }
          }
        });
      }
      /**
       * 审核文章
       * @method function
       * @return {[type]} [description]
       */
    action.pass = function(obj) {
        var id = common.getCheckId(obj);
        if (id == '0') {
          return;
        }
        var ispass = "false";
        if (obj.html() == '审核') {
          ispass = "true";
        }
        $.ajax({
          url: options.url + 'pass',
          data: 'id=' + id + '&ispass=' + ispass,
          success: function(msg) {
            if (msg.state == true) {
              console.log('asdasd');
              var ids = id.split(',');
              if (ispass == "true") { //审核
                for (var i = 0, ll = ids.length; i < ll; i++) {
                  console.log(ids[i]);
                  var oo = $('#' + ids[i]).parent().parent();
                  oo.find('b').remove();
                  oo.find('i.pass').html('取消审核');
                }
              } else { //取消审核
                for (var i = 0, ll = ids.length; i < ll; i++) {
                  var oo = $('#' + ids[i]).parent().parent();
                  oo.children('a').after('<b>[未审核]</b>');
                  oo.find('i.pass').html('审核');
                }
              }
            }
          }
        });
      }
      /**
       * 显示评论
       * @method function
       * @param  {[type]} * [description]
       * @return {[type]}   [description]
       */
    action.comment = function(obj) {
        commentObj = obj;
        var ocomment = $(".commentlist");
        if(ocomment.length == 1) {
          ocomment.next("div").remove();
          ocomment.remove();
        } else {
          commentPage(1, 0);
        }
      }
      /**
       * 删除评论
       * @method function
       * @param  {[type]} obj [description]
       * @return {[type]}     [description]
       */
    action.commentRemove = function(obj) {
        layer.confirm("您确定要删除该评论吗？", {title:"提示"},function(index) {
          var id = obj.parent().parent().attr("id").split("_")[1];
          $.ajax({
            url: cmtOption.url + "del",
            data: "id=" + id,
            success: function(msg) {
              if(msg.state == true) {
                $("#comment_" + id).remove();
              }
            }
          })
          layer.close(index);
        });
      }
      /**
       * 获取文章评论列表
       * @method commentPage
       * @param  {[type]}    obj [description]
       * @param  {[type]}    cp  [description]
       * @return {[type]}        [description]
       */
    function commentPage(cp, oldcp) {
      cp = cp ? cp : 1;
      oldcp = oldcp ? oldcp : 0;
      var id = common.getId(commentObj);
      var opli = commentObj.parent().parent();
      $.ajax({
        url: cmtOption.url + 'page',
        data: 'id=' + id + "&cp=" + cp + "&mp=" + cmtOption.mp,
        success: function(msg) {
          if(msg.state == false) {
              pizzalayer.msg({msg: '获取列表失败，请稍后重试'});
              return;
          }
          if(msg.count == 0) {
              pizzalayer.msg({ msg: '暂无评论'});
            return;
          }
          if (cp == 1) {//实例化翻页对象
            tpage = new trunpage({
              name: "article.commentPage",
              sum: msg.count,
              mp: cmtOption.mp
            });
          }
          var s = cmtOption.tpl({
            "data": msg.msg
          });
          opli.next("ul").remove();
          opli.next("div").remove();
          opli.after(s + tpage.hunde(cp));
          cmtOption.cp += 1;
        }
      });
    }
    /**
     * 获取文章评论对外接口
     * @method function
     * @param  {[type]} obj [description]
     * @param  {[type]} cp  [description]
     * @return {[type]}     [description]
     */
    my.commentPage = function(cp, oldcp) {
      commentPage(cp, oldcp);
    }
  
  
    return my;
  }());
  
  module.exports = article;
  

});
