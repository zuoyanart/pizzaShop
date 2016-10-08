
let pwd = (()=>{
  let self = {};
  let $ = require("jquery");
  require("layer");
  require("pizzaui");

  self.init = ()=> {
    validate();
  }
  /**
   * 表单验证，提交
   * @method
   * @return {[type]} [description]
   */
  let validate = () => {
    $(".form").pizzaValidate({
        'fields': {
            '#oldpassword': {
                'must': true,
                'minLength': 6,
                'maxLength': 20,
                'url': "/user/pwd/check",
                focusMsg: "请输入原密码",
                errMsg: '原密码格式不合法'
            },
            '#password': {
                'must': true,
                'minLength': 6,
                'maxLength': 20,
                focusMsg: "请输入密码",
                errMsg: '请输入密码'
            },
            '#password1': {
                'must': true,
                'minLength': 6,
                'maxLength': 20,
                'comp': "#password",
                focusMsg: "请输入密码",
                errMsg: '请输入密码'
            },
        },
        ajaxFun: function(data) {
            $.ajax({
              type:"post",
                url: "/user/pwd/edit",
                data: data,
                success: function(msg) {
                    if (msg.state == true) {
                       layer.msg("更新成功");
                       $("#password").val("");
                       $("#password1").val("");
                       $("#oldpassword").val("");
                    }
                }
            });
        }
    });
  }

  return self;
})();

module.exports = pwd;
