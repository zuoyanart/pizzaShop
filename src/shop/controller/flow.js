'use strict';

import Base from './base.js';


export default class extends Base { //购物车相关
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
            let userid = parseInt(this.cookie("user_id"));
            if (userid > 0) { //已经登录
                let cartM = this.model("cart");
                let goodsM = this.model("goods");
                let carts = await cartM.page(userid, 1, 50);
                let request = [];
                let data = carts.msg;
                let cartsNum = {}; //goosid:no
                for (let i = 0, ll = data.length; i < ll; i++) {
                    request.push(goodsM.get(data[i].goods_id));
                    cartsNum["goods" + data[i].goods_id] = data[i].goods_number;
                }
                let result = await Promise.all(request);
                for (let i = 0, ll = data.length; i < ll; i++) { //更新购买数量
                    result[i].msg.no = cartsNum["goods" + result[i].msg.goods_id];
                }
                this.assign({
                    data: result
                });
                return this.display();
            } else {
                let goodsM = this.model("goods");
                let cart = this.cookie("user_cart");
                if (typeof(cart) == "object") {
                    cart = JSON.parse(this.cookie("user_cart")).cart;
                } else {
                    cart = [];
                }
                let request = [];
                let cartsNum = {}; //goosid:no
                for (let i = 0; i < cart.length; i++) {
                    request.push(goodsM.get(cart[i].id));
                    cartsNum["goods" + cart[i].id] = cart[i].no;
                }

                let result = await Promise.all(request);
                for (let i = 0; i < cart.length; i++) {//更新购买数量
                    result[i].msg.no = cartsNum["goods" + result[i].msg.goods_id];
                }
                this.assign({
                    data: result
                });
                return this.display();
            }
        }
        /**
         * 创建或者更新购物车表
         * @method createActon
         * @return {[type]}    [description]
         */
    async createActon() {
        let param = xss(this.post());
        let cart_id = this.cookie("cart_id"); //获取购物车id
        let uid = this.cookie("userid"); //用户登录的id
        console.log(cart_id);
        if (uid) { //如果用户已经登录

        } else { //如果用户没有登录
            if (!cart_id) { //如果购物车id不存在
                cart_id = this.uuid();
                this.cookie("cart_id", cart_id, {
                    timeout: 7 * 24 * 3600, //7天有效期,无登陆购物车的有效期为7天
                    httponly: true
                });
            }
        }

    }
}
