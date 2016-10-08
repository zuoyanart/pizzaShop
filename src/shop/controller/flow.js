'use strict';

import Base from './base.js';


export default class extends Base { //购物车相关
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
            let goodsM = this.model("goods");
            let cart = JSON.parse(this.cookie("user_cart")).cart;
            console.log(cart);
            let request = [];

            for (let i =0;i<cart.length;i++) {
                request.push(goodsM.get(cart[i].id));
            }

            let result = await Promise.all(request);

            this.assign({
              data: result,
              cart: cart
            });
            return this.display();
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
