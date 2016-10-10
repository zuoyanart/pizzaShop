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
            $(cartobj).click(function() {
                addCart();
            });
        }
        /**
         * 添加到购物车
         * @method
         * @return {[type]} [description]
         */
    let addCart = () => {
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
                if (!isexit) {//购物车不存在，则添加
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
    self.del = (goodsnum) => {
            let item = store.get("pz_cart");
            delete item[goodsnum];
            stote.set("pz_cart", item);
            addCartToServer();
        }
        /**
         * 更新商品数量
         * @method
         * @param  {[type]} goodsnum [description]
         * @return {[type]}          [description]
         */
    self.updateNumber = (goodsnum) => {
        addCartToServer();
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
