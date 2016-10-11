/**
 * 购买页面
 * @method
 * @param  {[type]} ( [description]
 * @return {[type]}   [description]
 */
let buy = (() => {
    let self = {};
    let $ = require("jquery");
    require("layer");
    require("pizzaui");

    self.init = () => {
            $(".number").on("blur", function() { //更改购买数量
                changeNumber($(this));
            });
            $(".addrradio").on("click", function() {
                addrChoose($(this));
            });
            $(".addorder").on("click", function() {
              addOrder();
            });
        }
        /**
         * 更新购买数量
         * @method
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    let changeNumber = (obj) => {
            let number = parseInt($(obj).val());
            if (number > 0) {
                //TODO:
            } else {
                $(obj).val(1);
                number = 1;
            }
            let goodsid = $(obj).parent().parent().attr("id").split("_")[1];
            $.ajax({
                type: "post",
                url: "/user/buy/number",
                data: "goodsid=" + goodsid + "&count=" + number,
                success: function(msg) {
                    if (msg.state == true) {
                        let money = 0;
                        let trs = $(".tr");
                        for (let i = 0, ll = trs.length; i < ll; i++) {
                            console.log(i);
                            let tds = $(trs[i]).find("td");
                            let my = parseFloat($(tds[2]).find("em").html()) * parseInt($(tds[3]).find("input").val());
                            money += my;
                            $(tds[4]).find("em").html(my);
                        }
                        $(".money").html(money);
                    } else {
                        layer.msg("更新失败");
                    }
                }
            });
        }
        /**
         * 切换收货地址
         * @method
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    let addrChoose = (obj) => {
            let o = $(obj);
            let op = o.parent();

            if (op.hasClass("addr-active")) {
                return;
            }
            $(".addr-active").find("span").html("");
            $(".addr-active").removeClass("addr-active");
            op.addClass("addr-active").find("span").html("寄送至：");
            $(".address").find("label").html(op.find("i").text());
            $(".shouhuoren").find("label").html(op.find("strong").text().replace("（", "").replace("）", "").replace("收", "&nbsp;&nbsp;"));
        }
        /**
         * 添加订单
         * @method
         * @return {[type]} [description]
         */
    let addOrder = () => {
        let addrid = $(".addrradio:checked").attr("id").replace("addr", "");
        let postscript = $.trim($("#postscript").val());
        $.ajax({
            type: "post",
            url: "/user/orderinfo/add",
            data: "addrid=" + addrid + "&postscript=" + postscript,
            success: function(msg) {
                if (msg.state == true) {
                    document.location.href = "/user/pay?id=" + msg.msg.orderid;
                }
            }
        })
    }

    return self;
}());
module.exports = buy;
