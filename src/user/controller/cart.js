'use strict';

import Base from './base.js';


export default class extends Base { //订单相关
    /**
     * 提交订单
     * @return {Promise} []
     */
    async addAction() {
            let cartM = this.model("shop/cart");
            let userid = this.cookie("user_id");
            let param = xss(this.post());

          let result = await cartM.create({
                  "goods_id": param.goodsid,
                  "user_id": userid,
                  "goods_number": parseInt(param.no)
                });

            return this.json(result);
        }
}
