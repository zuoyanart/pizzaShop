/**
 * 支付相关
 * @method
 * @param  {[type]} ( [description]
 * @return {[type]}   [description]
 */
let pay = (() => {
    let self = {};
    let $ = require("jquery");
    let tools = require("pizzatools");
    require("layer");
    require("pizzaui");


    self.init = function() {
            $("#pay").on("click", function() {
                payAction();
            });

            $(".channel>span").on("click", function() {
                chooseChannel(this);
            });
        }
        /**
         * 调起支付控件
         * @method
         * @return {[type]} [description]
         */
    let payAction = () => {
            let channel = $(".channel>.action").attr("data");
            if (!channel) {
                channel = "upacp_pc";
            }
            
            $.ajax({
                type: "post",
                url: "/user/pay/pay",
                data: "channel=" + channel + "&orderid=" + tools.getPara("id"),
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
        /**
         * 选择支付渠道
         * @method
         * @return {[type]} [description]
         */
    let chooseChannel = (obj) => {
        let o = $(obj);
        if (o.hasClass("action")) {
            return;
        } else {
            $(".channel").find("span.action").removeClass("action");
            o.addClass("action");
        }
    }

    return self;
}());

module.exports = pay;
