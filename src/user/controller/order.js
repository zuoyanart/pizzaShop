'use strict';

import Base from './base.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let orderInfoM = this.model("shop/order_info");
        let orderGoodsM = this.model("shop/order_goods");

        let userid = this.cookie("user_id");
        orderInfoM.page(userid, 1, 20).then(function(a) {
            console.log("a");
            console.log(a);
        });

        let order = await orderInfoM.page(userid, 1, 20);
        order = order.msg;
        let request = [];

        for (let i = 0, ll = order.length; i < ll; i++) {
            request.push(function() {
                return new Promise(function(resolve, reject) {
                    orderGoodsM.page(order[i].order_id, 1,30).then(function(result) {
                        order[i].goods = result.msg;
                        if (true) {
                            resolve(result);
                        } else {
                            reject("error");
                        }
                    });
                });
            }());
        }

        let result = await Promise.all(request);

        console.log(order);
        this.assign({
            order: order
        });

        return this.display();
    }
}
