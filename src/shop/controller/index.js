'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {

        let goods = this.model("goods");

        let  goodsResult = await goods.page({
          // status: 0
        });

        this.assign({
          hot: goodsResult
        });
        return this.display();
    }
}
