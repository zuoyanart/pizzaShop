'use strict';

import Base from './base.js';
import tools from '../../common/tools/tools.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let goods = this.model("goods");
        let id = this.get("id");
        let goodsResult = await goods.get(id);//获取商品详细
        console.log(goodsResult);
        this.assign({
           goods: goodsResult.msg
        });

        return this.display();
    }
}
