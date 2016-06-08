'use strict';
/**
 * 商品类型属性
 */
import Base from './base.js';
import tools from '../../common/tools/tools.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
            this.assign({
                "catid": tools.xss(this.get("catid")),
                "catname": tools.xss(escape(this.get("catname")))
            });
            return this.display();
        }
        /**
         * 获取所有子节点
         * @method pageAction
         * @return {[type]}   [description]
         */
    async pageAction() {
            let param = tools.xss(this.post());
            // let node = await tools.httpAgent(this.config("api") + 'node/page', "post", "pid=" + this.post("pid"));
            let node = await this.model("goodsattr").page(param.goodsid);
            return this.json(node);
        }
        /**
         *  返回所有的节点列表
         * @method pageallAction
         * @return {[type]}      [description]
         */
    async pageallAction() {
            // let node = await tools.httpAgent(this.config("api") + 'node/pageall', "get");
            let node = await this.model("goodstypeattr").pageall();
            return this.json(node);
        }
        //编辑节点
    editAction() {
        return this.display();
    }

    /**
     * 获取节点操作
     * @method getAction
     * @return {[type]}  [description]
     */
    async getAction() {
        // let node = await tools.httpAgent(this.config("api") + 'node/' + this.post("id"), "get");
        let node = await this.model("goodstypeattr").get(this.post("id"));
        return this.json(node);
    }

    /**
     * 更新节点
     * @method updateAction
     * @return {[type]}     [description]
     */
    async updateAction() {
        let p = this.post();
        p.attrid = parseInt(p.attrid);
        p.catid = parseInt(p.catid);
        p.inputtype = parseInt(p.inputtype);
        p.attrtype = parseInt(p.attrtype);
        p.weight = parseInt(p.weight);
        p.attrvalue = p.attrvalue.replace(/ /g, "");
        // let node = await tools.httpAgent(this.config("api") + 'node', "put", p);
        let node = await this.model("goodstypeattr").edit(p);
        if (node.state == true) {
            return this.json({
                "state": true
            });
        } else {
            return this.json({
                "state": false
            });
        }
    }

    /**
     * 更新节点
     * @method updateAction
     * @return {[type]}     [description]
     */
    async createAction() {
            let p = tools.xss(this.post());
            console.log(p);
            console.log(p.length);
            let len = p.itemlength;
            let attr = this.model("goodsattr");
            await this.model("goods").updateGoodsType(p.goodsid, p.goodstype);
            attr.del(p.goodsid);
            for (var key in p) {
                if (key.indexOf("catid") > -1 && p[key] != '') {
                    await attr.create({
                        goodsid: p.goodsid,
                        attrid: key.split('_')[1],
                        attrvalue: p[key],
                        attrprice: p[key.replace("catid", "price")] ? p[key.replace("catid", "price")] : 0
                    });
                }
            }
            return this.json({
                "state": true
            });
        }
        /**
         * 删除品牌
         * @method removeAction
         * @return {[type]}     [description]
         */
    async removeAction() {
        let p = tools.xss(this.post());
        let pinpai = await this.model("goodstypeattr").remove(p.id);
        return this.json({
            "state": true
        });

    }


}
