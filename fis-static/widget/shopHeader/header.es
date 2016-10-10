/**
 * 商城底部操作
 * @method
 * @param  {[type]} ( [description]
 * @return {[type]}   [description]
 */
let header = (() => {
    let self = {};
    let $ = require("jquery");
    let tools = require("pizzatools");

    self.init = () => {
            let userid = tools.getCookie("user_id");

            console.log(userid);

            if (userid != "0") {
                let username = tools.getCookie("user_username");
                $("#loginstate").html('<a href="/user">' + username + '</a> | <a href="javascript:void(0)" onclick="header.loginout();">退出登录</a>');
            }
        }
        /**
         * 退出登录
         * @method
         * @return {[type]} [description]
         */
    self.loginout = () => {
        $.ajax({
            url: "/login/loginout",
            success: function(msg) {
                let url = document.location.href;
                if (url.indexOf("/user") > -1) {
                    document.location.href = "/";
                } else {
                    document.location.reload();
                }
            }
        })
    }


    return self;
}());

module.exports = header;
