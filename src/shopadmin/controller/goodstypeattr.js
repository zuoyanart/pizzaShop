'use strict';
/**
 * 商品类型属性
 */
import Base from './base.js';

export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
            this.assign({
                "catid": xss(this.get("catid")),
                "catname": xss(escape(this.get("catname")))
            });
            return this.display();
        }
        /**
         * 获取所有子节点
         * @method pageAction
         * @return {[type]}   [description]
         */
    async pageAction() {
            let param = xss(this.post());
            // let node = await httpAgent(this.config("api") + 'node/page', "post", "pid=" + this.post("pid"));
            let node = await this.model("goodstypeattr").page(param.kw, parseInt(param.catid), param.cp, param.mp);
            return this.json(node);
        }
        /**
         *  返回所有的节点列表
         * @method pageallAction
         * @return {[type]}      [description]
         */
    async pageallAction() {
            // let node = await httpAgent(this.config("api") + 'node/pageall', "get");
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
        // let node = await httpAgent(this.config("api") + 'node/' + this.post("id"), "get");
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
        p.attrvalue = p.attrvalue.replace(/ /g,"");
        // let node = await httpAgent(this.config("api") + 'node', "put", p);
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
            let p = this.post();
            p.pid = parseInt(p.pid);
            p.weight = parseInt(p.weight);
            let node = await this.model("goodstypeattr").create(p);
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
         * 删除品牌
         * @method removeAction
         * @return {[type]}     [description]
         */
    async removeAction() {
        let p = xss(this.post());
        let pinpai = await this.model("goodstypeattr").remove(p.id);
        return this.json({
            "state": true
        });

    }


}
