/**
 * 模块相关操作
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
let tree = (function() {
  let $ = require('jquery');
  let tools = require('pizzatools');
  let common = require('common/common');
  let my = {};
  let options = {
    url: '/admin/tree/',
    tpl: __inline('../ejs/tree.ejs')
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
      let id = tools.getPara("id");
      if (id == "") {
        return;
      }
      $.ajax({
        url: options.url + 'get',
        data: 'id=' + id,
        success: function(msg) {
          console.log(msg.state == true);
          if (msg.state == true) {
            for (let key in msg.msg) {
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
          'minLength': 1,
          'maxLength': 150,
          focusMsg: "请输入自定义链接(非必填)",
          errMsg: '自定义链接须在1-150个字符之间'
        },
        '#weight': {
          'must': true,
          'minLength': 1,
          'maxLength': 3,
          focusMsg: "请输入节点权重",
          errMsg: '请输入节点权重，只能是小于4位的数字'
        },
        '#article_type': {
          'must': false,
          'minLength': 1,
          'maxLength': 30,
          focusMsg: "请选择正文类型",
          errMsg: '请选择正文类型'
        },
        '#keyword': {
          'must': false,
          'minLength': 1,
          'maxLength': 100,
          focusMsg: "请输入关键字",
          errMsg: '请输入关键字，字数必须小于100个字符'
        },
        '#seodes': {
          'must': false,
          'minLength': 1,
          'maxLength': 200,
          focusMsg: "请输入描述",
          errMsg: '请输入描述，字数必须小于200个字符'
        }

      },
      ajaxFun: function(data) {
        let id = tools.getPara("id");
        let pid = tools.getPara('pid');
        let op = "create";
        if (id != "") {
          op = "update";
          data += '&id=' + id;
        } else {
          data += '&pid=' + pid;
        }
        data += '&brief=' + escape(editor.html());
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
            let s = '<option value="1">首页</option>';
            let data = msg.msg;
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
    let s = '';
    for (let i = 0, len = data.length; i < len; i++) {
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
    let l = nodepath.split(',').length - 3;
    let s = '';
    if (l == 0) {
      return s;
    } else {
      s += '├'
      for (let i = 0; i < l; i++) {
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
    let o = $('#' + pid);
    $.ajax({
      url: options.url + 'page',
      data: 'pid=' + pid,
      success: function(msg) {
        let s = new EJS({
            text: options.tpl
        }).render({
            data: msg.msg
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
      let o = $(this);
      let cl = o.attr('class');
      let oparent = o.parent();
      let id = oparent.attr('id');
      let subli = $('.pid' + id);

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
    let node = pidObj.nextAll();
    let nodepath = pidObj.attr('path');
    let subnode;
    let action = {};
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
