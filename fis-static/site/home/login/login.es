let login = () => {
    let self = {};
    let $ = require("jquery");
    require("pizzaui");
    require("layer");
    

    self.init = () => {
      validate();
    }
    /**
     * 登录
     * @return {[type]} [description]
     */
    let validate = () => {
        $(".form").pizzaValidate({
            'fields': {
                '#username': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 48,
                    focusMsg: "请输入用户名",
                    errMsg: '用户名必须在2-48个字符之间且不能重复'
                },
                '#password': {
                    'must': true,
                    'minLength': 6,
                    'maxLength': 30,
                    focusMsg: "请输入密码",
                    errMsg: '密码需在6-30个字符之间'
                },
            },
            ajaxFun: function(data) {
                $.ajax({
                    type: "post",
                    url: "/login/login",
                    data: data,
                    success: function(msg) {
                        if (msg.state == true) {
                            document.location.href = "/user"
                        }
                    }
                });
            }
        });
    }

    return self;
}();

module.exports = login;
