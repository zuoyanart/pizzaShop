define('shopadmin/goodstypeattr/goodstypeattr', function(require, exports, module) {

  /**
   * 模块相关操作
   * @method
   * @param  {[type]} function( [description]
   * @return {[type]}           [description]
   */
  'use strict';
  
  var goodstypeattr = (function () {
    var $ = require('jquery');
    var tools = require('pizzatools');
    var common = require('common/common');
    var my = {};
    var options = {
      url: '/shopadmin/goodstypeattr/',
      tpl: "<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n  <li>\r\n    <label class=\"checkgroup\">\r\n      <input type=\"checkbox\" id=\"goodstype_<%= data[i].id%>\" name=\"checkall\"><label for=\"goodstype_<%= data[i].id%>\" class=\"check-all\"></label>\r\n    </label>\r\n    <a  target=\"_blank\"><%= data[i].attrname%></a>\r\n    <span><a href=\"/shopadmin/goodstypeattr/edit?id=<%= data[i].attrid%>&catid=<%= data.catid%>&catname=<%= data.catname%>\">编辑</a><i class=\"remove\">删除</i></span>\r\n  </li>\r\n<%}%>\r\n",
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
    my.get = function () {
      $("#inputtype").change(function () {
        ///绑定下拉change事件
        if ($(this).val() == "1") {
          $("#attrvalue").removeAttr("disabled");
        } else {
          $("#attrvalue").attr("disabled", "disabled");
        }
      });
      $("#catename").val(tools.getPara("catname"));
  
      var id = tools.getPara("id");
      if (id == "") {
        return;
      }
      $.ajax({
        url: options.url + 'get',
        data: 'id=' + id,
        success: function success(result) {
          if (result.state == true) {
            for (var key in result.msg) {
              $('#' + key).val(result.msg[key]);
            }
            if ($("#inputtype").val() == "1") {
              $("#attrvalue").removeAttr("disabled");
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
          '#attrname': {
            'must': true,
            'minLength': 1,
            'maxLength': 20,
            focusMsg: "请输入属性名称",
            errMsg: '属性不能为空或标题必须在1-20个字符之间'
          },
          '#inputtype': {
            'must': true,
            'minLength': 1,
            'maxLength': 2,
            focusMsg: "请选择商品录入方式",
            errMsg: '录入方式必须在1-20个字符之间'
          },
          '#attrvalue': {
            'must': false,
            'minLength': 1,
            'maxLength': 1000,
            focusMsg: "请输入可选值",
            errMsg: '可选值必须在1-1000个字符之间'
          },
          '#weight': {
            'must': true,
            'minLength': 1,
            'maxLength': 4,
            "reg": "int",
            focusMsg: "请输入标题",
            errMsg: '权重不能为空且必须在1-4位自然数'
          }
        },
        ajaxFun: function ajaxFun(data) {
          var id = tools.getPara("id");
          var catid = tools.getPara("catid");
          data += "&catid=" + catid;
  
          var op = "create";
          if (id != "") {
            op = "update";
            data += "&attrid=" + id;
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
        data: 'cp=' + options.cp + '&mp=' + options.mp + '&kw=' + $.trim($('#searchkw').val()) + "&catid=" + tools.getPara("catid"),
        success: function success(msg) {
          var data = msg.msg;
          data.catid = tools.getPara("catid");
          data.catname = escape(tools.getPara("catname"));
  
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
              $('#goodstypeattr_' + ids[i]).parent().parent().remove();
            }
          }
        }
      });
    };
  
    return my;
  })();
  
  module.exports = goodstypeattr;
  //# sourceMappingURL=/static/site/shopadmin/goodstypeattr/goodstypeattr.js.map
  

});
