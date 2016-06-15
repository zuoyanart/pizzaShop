'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {

        let goods = this.model("goods");
        //获取热销商品
        let hotGoods = await goods.page({
            is_hot: 1
        }, {
            cp: 1,
            mp: 5
        });
        //获取新品推荐
        let newGoods = await goods.page({
            is_new: 1
        }, {
            cp: 1,
            mp: 5
        });
        //获取精品推荐推荐
        let bestGoods = await goods.page({
            is_best: 1
        }, {
            cp: 1,
            mp: 5
        });

        this.assign({
            hotgoods: hotGoods,
            newgoods: newGoods,
            bestgoods: bestGoods
        });
        return this.display();
    }
}
