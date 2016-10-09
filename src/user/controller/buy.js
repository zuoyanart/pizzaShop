'use strict';

import Base from './base.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
            let addrM = this.model("home/addr");
            let goodsM = this.model("shop/goods");
            let cartM = this.model("shop/cart");

            let uid = parseInt(this.cookie("user_id"));
            let carts = await cartM.page(uid, 1, 50);
            let request = [];
            let data = carts.msg;
            let cartsNum = {}; //goosid:no
            for (let i = 0, ll = data.length; i < ll; i++) {
                request.push(goodsM.get(data[i].goods_id));
                cartsNum["goods" + data[i].goods_id] = data[i].goods_number;
            }
            let result = await Promise.all(request);
            let money = 0;
            for (let i = 0, ll = data.length; i < ll; i++) { //更新购买数量
                result[i].msg.no = cartsNum["goods" + result[i].msg.goods_id];
                money += result[i].msg.shop_price * result[i].msg.no;
            }

            let addr = await addrM.page(uid, 1, 20);
            this.assign({
                data: result,
                addr: addr.msg,
                money: money
            });

            return this.display();
        }
        /**
         * 更新购买数量,需写入购物车和重新计算价格和运费
         * @method updateNumber
         * @return {[type]}     [description]
         */
    async numberAction() {
        let param = xss(this.post());
        let userid = this.cookie("user_id");
        let cartM = this.model("shop/cart");
        if (parseInt(param.count) > 0) { //变化后的数量必须大于0
            let result = await cartM.editNumber(param.goodsid, userid, parseInt(param.count));
            return this.json({
                state: true
            })
        }
        return this.json({
            state: false
        });
    }
}
