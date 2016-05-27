var $, jQuery;
$ = jQuery = require('jquery');
require('layer');
require('pizzaui');
var login = (function() {
  var _self = this;
  var my = {};
  my.init = function() {
      validate();
      $("#password").keydown(function(event) {
        if (event.keyCode == 13) {
          $('.btn-success').click();
        }
      });
    }
    /**
     * 表单验证
     * @method validate
     * @return {[type]} [description]
     */
  function validate() {
    $("#form1").pizzaValidate({
      'fields': {
        '#name': {
          'must': true,
          'minLength': 4,
          'maxLength': 12,
          focusMsg: "请输入用户名",
          errMsg: '用户名不能为空或用户名必须在5-12个字符之间'
        },
        '#password': {
          'must': true,
          'minLength': 5,
          'maxLength': 12,
          focusMsg: "请输入您的密码",
          errMsg: '密码格式不合法'
        }
      },
      ajaxFun: function(data) {
        $.ajax({
          type: 'post',
          url: '/login/index/login',
          data: data,
          success: function(msg) {
            if (msg.state == true) {
              document.location.href = "/";
            } else {
              layer.msg('用户名或密码错误', {time: 2000});
            }
          }
        });
      }
    });
  }

  return my;
}());

module.exports = login;
