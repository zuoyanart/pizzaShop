/**
 * 购物车
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
let flow = (function() {
    let self = {};
    let $, jQuery;
    $ = jQuery = require('jquery');
    let tools = require("pizzatools");
    require('layer');
    require('pizzaui');

    self.init = (cartobj = '.addcart') => {
            $(".goodsdel").on("click", function() {
                del($(this));
            });
            $(".number").on("change", function() {
                updateNumber($(this));
            })
        }
        /**
         * 添加到购物车
         * @method
         * @return {[type]} [description]
         */
    self.addCart = () => {
            let goodsid = tools.getPara("id");
            let no = parseInt($("#goodsno").val());
            if (!(no > 0)) {
                no = 1;
            }

            let userid = tools.getCookie("user_id");
            if (userid != "0") { //已经登录
                $.ajax({
                    type: "post",
                    url: "/user/cart/add",
                    data: "goodsid=" + goodsid + "&no=" + no,
                    success: (msg) => {
                        document.location.href = "/shop/flow";
                    }
                });
            } else {
                let cart = tools.getCookie("user_cart");
                let item = [];
                if (cart == "0") {
                    cart = {};
                } else {
                    cart = JSON.parse(cart);
                    item = cart.cart;
                }
                let isexit = false;
                for (let i = 0, ll = item.length; i < ll; i++) {
                    if (item[i].id == goodsid) {
                        isexit = true;
                        item[i].no = parseInt(item[i].no) + 1;
                        break;
                    }
                }
                if (!isexit) { //购物车不存在，则添加
                    item.push({
                        "id": goodsid,
                        "no": no
                    });
                }
                cart["cart"] = item;
                tools.setCookie("user_cart", JSON.stringify(cart));
                document.location.href = '/shop/flow';
            }
        }
        /**
         * 删除商品
         * @method
         * @param  {[type]} goodsnum [description]
         * @return {[type]}          [description]
         */
    let del = (obj) => {
            let o = $(obj);
            let op = o.parent().parent();
            let goodsid = op.attr("id");
            let no = parseInt(op.find("input").val());
            if (!(no > 0)) {
                no = 1;
            }

            let userid = tools.getCookie("user_id");
            if (userid != "0") { //已经登录
                $.ajax({
                    type: "post",
                    url: "/user/cart/del",
                    data: "goodsid=" + goodsid,
                    success: (msg) => {
                        $("#" + goodsid).remove();
                    }
                });
            } else {
                let cart = tools.getCookie("user_cart");
                let item = [];
                if (cart == "0") {
                    cart = {};
                } else {
                    cart = JSON.parse(cart);
                    item = cart.cart;
                }
                if (item.length == 1) {
                    item = [];
                    $(".btn-danger").remove();
                } else {
                    for (let i = 0, ll = item.length; i < ll; i++) {
                        if (item[i].id == goodsid) {
                            delete item[i];
                            break;
                        }
                    }
                }
                cart["cart"] = item;
                tools.setCookie("user_cart", JSON.stringify(cart));
                $("#" + goodsid).remove();
            }
        }
        /**
         * 更新商品数量
         * @method
         * @param  {[type]} goodsnum [description]
         * @return {[type]}          [description]
         */
    let updateNumber = (obj) => {
            let o = $(obj);
            let op = o.parent().parent();
            let goodsid = op.attr("id"); //获取商品的id
            let number = parseInt($.trim(o.val()));
            if (!(number > 0)) { //数量必须大于0
                number = 1;
                o.val(1);
            }
            let userid = tools.getCookie("user_id");
            if (userid == "0") { //用户未登录
                let cart = tools.getCookie("user_cart");
                let item = [];
                if (cart == "0") {
                    cart = {};
                } else {
                    cart = JSON.parse(cart);
                    item = cart.cart;
                }
                for (let i = 0, ll = item.length; i < ll; i++) {
                    if (item[i].id == goodsid) {
                        item[i].no = number;
                        break;
                    }
                }
                cart["cart"] = item;
                tools.setCookie("user_cart", JSON.stringify(cart));
                formatMoney();
            } else {
                $.ajax({
                    url: "/user/buy/number",
                    data: "goodsid=" + goodsid + "&count=" + number,
                    success: function(msg) {
                        if (msg.state == true) {
                            formatMoney();
                        }
                    }
                })
            }


        }
        /**
         * 更新小计和总计
         * @method
         * @return {[type]} [description]
         */
    let formatMoney = () => {
        let money = 0;
        let trs = $(".tr");
        for (let i = 0, ll = trs.length; i < ll; i++) {
            let tds = $(trs[i]).find("td");
            let my = parseFloat($(tds[3]).find("em").html()) * parseInt($(tds[4]).find("input").val());
            money += my;
            $(tds[5]).find("em").html(my);
        }
        $(".money").html(money);
    }

    /**
     * 提交购物车数据到服务器
     * @method
     * @return {[type]} [description]
     */
    self.addCartToServer = (data = {}, callback = function() {}) => {
        // if (tools.getCookie("userid") == '') { //未登录状态不提交到服务器
        //     return;
        // }
        $.ajax({
            url: '/shop/flow/create',
            data: data,
            success: function(msg) {
                callback(msg);
                //TODO:
            }
        });
    }

    return self;
}());

module.exports = flow;
