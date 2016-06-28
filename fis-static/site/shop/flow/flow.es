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

    self.init = (cartobj = '.cart') => {

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
