/**
 * 文章相关操作
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
var userGroup = (function() {
  require('pizzaui');
  var $ = require('jquery');
  var tools = require('pizzatools');
  var common = require('common/common');
  var trunpage = require("trunpage/trunpage"); //获取翻页
  var pizzalayer = require("pizzalayer"); //获取翻页
  var tppage = null; //翻页的实例化
  var commentObj = null;

  var my = {};
  var options = {
    url: '/admin/usergroup/',
    tpl: __inline('../ejs/userGroup.ejs'),
    cp: 1,
    mp: 20
  };

  var roleOptions = { //评论相关操作
    url: '/admin/role/',
    tpl: __inline('../ejs/role.ejs'),
    cp: 1,
    mp: 20
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
      page(1); //

      common.kwSearch('#searchkw', function() { //绑定搜索框事件
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
            // $('#state').attr("val", msg.msg.state);
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
          '#name': {
            'must': true,
            'minLength': 4,
            'maxLength': 20,
            focusMsg: "请输入组名称",
            errMsg: '组名称不能为空且必须在4-20个字符之间'
          },
          '#des': {
            'must': false,
            'minLength': 1,
            'maxLength': 1000,
            focusMsg: "请输入描述，非必填",
            errMsg: '请输入描述'
          },
          '#state': {
            'must': true,
            'minLength': 1,
            'maxLength': 3,
            focusMsg: "请选择用户组状态",
            errMsg: '请选择用户组状态'
          }
        },
        ajaxFun: function(data) {
          var id = tools.getPara("id");
          var op = "create";
          if (id != "") {
            op = "update";
            data += '&id=' + id;
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
     * 编辑文章
     * @method function
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
  my.getRole = function() {
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
            // $('#state').attr("val", msg.msg.state);
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
  my.editRole = function() {
      $(".form").pizzaValidate({
        'fields': {
          '#name': {
            'must': true,
            'minLength': 4,
            'maxLength': 20,
            focusMsg: "请输入组名称",
            errMsg: '组名称不能为空且必须在4-20个字符之间'
          },
          '#des': {
            'must': false,
            'minLength': 1,
            'maxLength': 1000,
            focusMsg: "请输入描述，非必填",
            errMsg: '请输入描述'
          },
          '#state': {
            'must': true,
            'minLength': 1,
            'maxLength': 3,
            focusMsg: "请选择用户组状态",
            errMsg: '请选择用户组状态'
          }
        },
        ajaxFun: function(data) {
          var id = tools.getPara("id");
          var op = "create";
          if (id != "") {
            op = "update";
            data += '&id=' + id;
          } else {
            data += '&groupid=' + tools.getPara("groupid");
          }
          $.ajax({
            url: roleOptions.url + op,
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
              $('#' + ids[i]).parent().parent().remove();
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
     * 显示角色列表
     * @method function
     * @param  {[type]} * [description]
     * @return {[type]}   [description]
     */
  action.actionRole = function(obj) {
      var id = common.getId(obj);
      var opli = obj.parent().parent();
      $.ajax({
        url: roleOptions.url + "page",
        data: "groupid=" + id +"&cp=1&mp=" + roleOptions.mp,
        success: function(msg) {
          if(msg.state == false) {
              pizzalayer.msg({msg: '获取列表失败，请稍后重试'});
              return;
          }
          if(msg.msg.length == 0) {
              pizzalayer.msg({ msg: '暂无角色'});
              return;
          }
          var s = roleOptions.tpl({
            "data": msg.msg
          });
          opli.next("ul").remove();
          opli.next("div").remove();
          opli.after(s);
        }
      });
    }
    /**
     * 删除评论
     * @method function
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
  action.commentRemove = function(obj) {
    layer.confirm("您确定要删除该评论吗？", {
      title: "提示"
    }, function(index) {
      var id = obj.parent().parent().attr("id").split("_")[1];
      $.ajax({
        url: roleOptions.url + "del",
        data: "id=" + id,
        success: function(msg) {
          if (msg.state == true) {
            $("#comment_" + id).remove();
          }
        }
      })
      layer.close(index);
    });
  }


  return my;
}());

module.exports = userGroup;
