'use strict';

import Base from './base.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
            return this.display();
        }
        /**
         * 登录
         * @return {[type]} [description]
         */
    async loginAction() {
        let userM = this.model("user");
        let user = xss(this.post());
        let result = await userM.checkUserLogin(user.username, user.password);
        console.log(result);
        if (result.state == true) {
            let data = result.msg;
            let ua = this.userAgent();
            this.cookie("user_username", user.username);
            this.cookie("user_id", data.id);
            this.cookie("user_key", think.md5(user.username + ua + data.id + think.config("salt")), {
                httponly: true
            });
            //登录成功后，添加记录和购物车等操作
            let cartM = this.model("shop/cart");
            let request = [];
            let userid = parseInt(result.msg.id);
            let cart = this.cookie("user_cart");
            if (typeof(cart) == "object") {
                cart = JSON.parse(this.cookie("user_cart")).cart;
            } else {
              cart = [];
            }

            for (let i = 0; i < cart.length; i++) {
                request.push(cartM.create({
                    "goods_id": parseInt(cart[i].id),
                    "user_id": userid,
                    "goods_number": parseInt(cart[i].no) > 0 ? parseInt(cart[i].no) : 1,
                }));
            }
            await Promise.all(request);
            this.cookie("user_cart", null); //清除购物车数据
            return this.json({
                state: true
            });
        } else {
            return this.json({
                state: false
            });
        }
    }
}
