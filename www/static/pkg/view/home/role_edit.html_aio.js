/*!trunpage/trunpage*/
;define('trunpage/trunpage', function(require, exports, module) {

  /**
   * 整站翻页样式
   * @authors lingirl (success99@126.com)
   * @date    2015-09-08 16:06:29
   */
  
  var $ = require('jquery');
  
  var turnpage = function(options) {
  	var _self = this;
  	_self.isLink = false;
  	_self.last = 0; //翻页算法中的last，非整数页的条数
  
  	var defaults = {
  		name: '', // 函数执行体，<函数名.方法>的形式
  		sum: 0, // 总的数据条数
  		pageTotal: 0, //总页数
  		mp: 10, // 默认每页显示多少条
  		docs: null //数据记录
  	};
  
  	options = $.extend(defaults, options);
  
  	if (options.name.indexOf('/') > -1) {
  		_self.isLink = true;
  	}
  
  	// 首页、上一页、下一页，翻页模式
  	_self.hud = function(cp, mp) {
  		var str = ''; // 用于拼接 html 字符串
  		var clk = {
  			// home 、up、down -- 分别对应首页、上一页、下一页的点击事件
  			h: ' onclick="' + options.name + '(1);"',
  			u: ' onclick="' + options.name + '(' + (cp - 1) + ');"',
  			d: ' onclick="' + options.name + '(' + (cp + 1) + ');"'
  		};
  
  		var a = '<div class="clearfix turnpage turnpage-hud"><a class="btn btn-primary"',
  			b = '>首页</a><a class="btn btn-primary"',
  			c = '>上一页</a><a class="btn btn-primary"',
  			d = '>下一页</a></div>';
  
  		if (cp <= 1) {
  			if (mp == options.mp) {
  				str = a + b + c + clk.d + d;
  			}
  			if (mp < options.mp) {
  				str = a + b + c + d;
  			}
  		}
  
  		if (cp > 1) {
  			if (mp == options.mp) {
  				str = a + clk.h + b + clk.u + c + clk.d + d;
  			}
  			if (mp < options.mp) {
  				str = a + clk.h + b + clk.u + c + d;
  			}
  		}
  
  		return str;
  	};
  
  	// 标准翻页模式，包含首页、上下页、末页、及数字分页
  	_self.hunde = function(cp) {
      console.log(options);
  		var btnClass = 'btn btn-primary',
  			gap = '<em>...</em>';
  		var numberClass = 'number';
  
  		if (cp == 1 && options.pageTotal == 0) { //当是第一页并且总页数未知时执行
  			options.pageTotal = Math.ceil(options.sum / options.mp);
  			var m = options.sum % options.mp;
  			if (m != 0) {
  				_self.last = m;
  			}
  		}
  
  		if (options.pageTotal <= 1) {
  			return '';
  		}
  		var str = '<div class="turnpage">';
  		if (cp == 1) {
  			str += '<a href="javascript:void(0);" class="' + btnClass + ' disabled">首页</a><a href="javascript:void(0);" class="' + btnClass + ' disabled">上页</a>';
  		} else {
  			str += '<a href="' + clickEvent(1, 0) + '" class="' + btnClass + '">首页</a><a href="' + clickEvent((cp - 1), cp) + '" class="' + btnClass + '">上页</a>';
  		}
  		var len = 0;
  		if (cp < 6 || (cp < 9 && options.pageTotal < 9)) {
  			if (options.pageTotal > 8) {
  				len = 8;
  			} else {
  				len = options.pageTotal + 1;
  			}
  			for (var i = 1; i < len; i++) {
  				if (i == cp) {
  					str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
  				} else {
  					str += '<a href="' + clickEvent(i, cp) + '" class="' + numberClass + '">' + i + '</a>';
  				}
  			}
  			if (options.pageTotal > 8) {
  				str += gap + '<a href="' + clickEvent(options.pageTotal, 0) + '" class="' + numberClass + '">' + options.pageTotal + '</a>';
  			}
  		} else if (cp > 5 && (options.pageTotal - 5) >= cp && cp != options.pageTotal) {
  			str += '<a href="' + clickEvent(1, 0) + '" class="' + numberClass + '">1</a>' + gap;
  			var leng = cp - 2;
  			for (var i = leng; i <= (cp + 2); i++) {
  				if (i == cp) {
  					str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
  				} else {
  					str += '<a href="' + clickEvent(i, cp) + '" class="' + numberClass + '">' + i + '</a>';
  				}
  			}
  			str += gap + '<a href="' + clickEvent(options.pageTotal, 0) + '" class="' + numberClass + '">' + options.pageTotal + '</a>';
  		} else {
  			str += '<a href="' + clickEvent(1, 0) + '" class="' + numberClass + '">1</a>' + gap;
  			for (var i = (options.pageTotal - 6); i <= options.pageTotal; i++) {
  				if (i == cp) {
  					str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
  				} else {
  					str += '<a href="' + clickEvent(i, cp) + '" class="' + numberClass + '">' + i + '</a>';
  				}
  			}
  		}
  		if (options.pageTotal == cp) {
  			str += '<a href="javascript:void(0)" class="' + btnClass + ' disabled">下页</a><a class="' + btnClass + ' disabled" href="javascript:void(0);">末页</a>';
  		} else {
  			str += '<a href="' + clickEvent((cp + 1), cp) + '" class="' + btnClass + '">下一页</a><a href="' + clickEvent(options.pageTotal, 0) + '"  class="' + btnClass + '">末页</a>';
  		}
  		str += '</div>';
  		return str;
  	};
  	/**
  	 * 组装href属性
  	 * @param  {[type]} page 改连接对应的cp
  	 * @param  {[type]} oldpage 当前cp
  	 * @return {[type]}      [description]
  	 */
  	function clickEvent(page, oldpage) {
  		var s = '';
  		if (_self.isLink) { //传值是一个连接
  			s = options.name + '?cp=' + page;
  		} else { //传值是一个函数
  			s = 'javascript:' + options.name + '(' + page + ', ' + oldpage + ')';
  		}
  		return s;
  	}
  	/**
  	 * 获取翻页算法中的参数
  	 * @param  {[type]} page    [description]
  	 * @param  {[type]} oldpage [description]
  	 * @return {[type]}         [description]
  	 */
  	_self.getPageAjaxData = function(page, oldpage) {
  			var pageAjaxData = 'last=0&step=0&v=1';
  			var v = 1; //1向下翻，2向上翻
  			var step = 1; //翻几页
  			if (page == 1) {
  				step = 0;
  				v = 1;
  			} else if (page == options.pageTotal) {
  				step = 0;
  				v = 2;
  			} else {
  				if (page < oldpage) {
  					v = 2;
  				}
  				step = Math.abs(page - oldpage);
  			}
  			pageAjaxData = 'last=' + _self.last + '&step=' + step + '&v=' + v;
  			var array = [];
  			array.push(pageAjaxData);
  			array.push(v);
  			return array;
  		}
  		/**
  		 * 获取参数id
  		 * @param  {[type]} docs [description]
  		 * @return {[type]}      [description]
  		 */
  	_self.getPageAjaxDataId = function(docs, v) {
  		var id = 0;
  		if (docs) {
  			var length = docs.length;
  			if (v == 2) {
  				if (length > 0) {
  					id = docs[0]._id; //给最后一个id赋值给内部全局遍历id
  				}
  			} else {
  				if (length > 0) {
  					id = docs[length - 1]._id; //给最后一个id赋值给内部全局遍历id
  				}
  			}
  		} else {
  			id = 0;
  		}
  		return id;
  	}
  };
  
  module.exports = turnpage;
  

});

/*!home/usergroup/usergroup*/
;define('home/usergroup/usergroup', function(require, exports, module) {

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
      url: '/home/usergroup/',
      tpl: "<%for(var i=0,ll=data.length; i<ll; i++) { %>\n  <li>\n    <label class=\"checkgroup\">\n      <input type=\"checkbox\" id=\"group_<%= data[i].id%>\" name=\"checkall\">\r\n      <label for=\"<%= data[i].id%>\" class=\"check-all\"></label>\n    </label>\n    <a href=\"\">\n      <%= data[i].name%>\n    </a>\n    <span><a href=\"/usergroup/edit?id=<%= data[i].id%>\">编辑</a><i class=\"actionRole\">查看角色</i><a href=\"/role/edit?groupid=<%= data[i].id%>\">添加角色</a>\r\n      <% if(data[i].state == -1){%>\n        <i class=\"pass\">取消冻结</i>\n        <%} else {%>\n          <i class=\"pass\">冻结</i>\n          <%}%>\n  </li>\n  <%}%>\r\n",
      cp: 1,
      mp: 20
    };
  
    var roleOptions = { //评论相关操作
      url: '/home/role/',
      tpl: "<ul class=\"list rolelist\">\r\n<%for(var i=0,ll=data.length; i<ll; i++) { %>\r\n  <li id=\"role_<%= data[i].id%>\">\r\n    <a href=\"javascript:void(0);\"><%= data[i].name%></a>\r\n    <span><i class=\"roleRemove\">冻结</i></span>\r\n  </li>\r\n<%}%>\r\n</ul>\r\n",
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
  

});

