'use strict';
/**
 * 商品类型属性
 */
import Base from './base.js';
import tools from '../../common/tools/tools.js';
export default class extends Base {


    /**
     * 更新节点
     * @method updateAction
     * @return {[type]}     [description]
     */
    async createAction() {
        let param = tools.xss(this.post());
        param.goodsid = parseInt(param);
        let item = {};
        let gallery = this.model("goodsgallery");
        let row = await gallery.remove(param.goodsid);
        if (row.state) {
            for (let i = 0; i < 5; i++) {
                if (param["img_url-" + i] != "") {
                    item = {
                        goods_id: param.goodsid,
                        img_url: param["img_url-" + i]
                    }
                    gallery.add(item);
                }
            }
        }
    }
}
