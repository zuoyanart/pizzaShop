'use strict';
/**
 * 商品类型属性
 */
import Base from './base.js';

export default class extends Base {


    /**
     * 创建和更新商品相册
     * @method updateAction
     * @return {[type]}     [description]
     */
    async createAction() {
        let param = xss(this.post());
        param.goodsid = parseInt(param.goodsid);
        let item = {};
        let gallery = this.model("goodsgallery");
        let row = await gallery.remove(param.goodsid); //删除该商品所有的照片
        if (row.state) {
            for (let i = 0; i < 5; i++) {
                if (param["img_url-" + i] != "") {
                    item = {
                        goods_id: param.goodsid,
                        img_url: param["img_url-" + i]
                    }
                    gallery.add(item); //插入照片
                }
            }
        }
        return this.json({
            state: true
        });
    }
}
