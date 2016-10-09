let pay = (() => {
    let self = {};
    let $ = require("jquery");


    self.init = function() {
        $("#pay").on("click", function() {
            payAction();
        });
    }

    let payAction = () => {
        $.ajax({
            type: "post",
            url: "/user/pay/pay",
            data: "channel=upacp_pc",
            success: function(charge) {
                pingpp.createPayment(charge, function(result, err) {
                    if (result == "success") {
                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                    } else if (result == "fail") {
                        // charge 不正确或者微信公众账号支付失败时会在此处返回
                    } else if (result == "cancel") {
                        // 微信公众账号支付取消支付
                    }
                });
            }
        })
    }

    return self;
}());

module.exports = pay;
