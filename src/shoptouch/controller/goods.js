'use strict';

import Base from './base.js';


export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let goods = this.model("goods");
        let gallery = this.model("shopadmin/goodsgallery");
        let goodsAttr = this.model("goodsattr");

        let id = this.get("id");
        let promiseArr = [];
        promiseArr.push(goods.get(id)); //获取商品详细
        promiseArr.push(gallery.page(id, 1, 10)); //获取相册列表
        promiseArr.push(goodsAttr.page(id));

        let result = await Promise.all(promiseArr);

        this.assign({
            goods: result[0].msg,
            gallery: result[1].msg,
            goodsattr: result[2].msg,
            url: think.config("cloudImgUrl").shop
        });

        return this.display();
    }
}
