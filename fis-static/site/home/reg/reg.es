/**
 * 注册相关
 */

let reg = () => {
    let self = {};
    let $ = require('jquery');
    let tools = require('pizzatools');
    let pizzalayer = require("pizzalayer");
    require("pizzaui");
    require("layer");

    self.init = () => {
            validate(); //注册
        }
        /**
         * 注册验证
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
                    errMsg: '用户名不能为空或用户名必须在5-48个字符之间'
                },
                '#mail': {
                    'must': true,
                    'minLength': 1,
                    'maxLength': 30,
                    'reg': "mail",
                    focusMsg: "请输入邮箱",
                    errMsg: '邮箱格式不合法'
                },
                '#phone': {
                    'must': true,
                    'minLength': 10,
                    'maxLength': 20,
                    'reg': "phone",
                    focusMsg: "请输入手机号码",
                    errMsg: '请输入手机号码'
                },
                '#password': {
                    'must': true,
                    'minLength': 6,
                    'maxLength': 30,
                    focusMsg: "请输入密码",
                    errMsg: '密码需在6-30个字符之间'
                },
                '#password1': {
                    'must': true,
                    'minLength': 6,
                    'maxLength': 30,
                    'comp': "#password",
                    focusMsg: "请输入密码",
                    errMsg: '两次密码不一致'
                }
            },
            ajaxFun: function(data) {
                $.ajax({
                    url: "/reg/reg",
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

    return self;
}();

module.exports = reg;
