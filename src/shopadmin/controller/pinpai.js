'use strict';

import Base from './base.js';
import tools from '../../common/tools/tools.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
            return this.display();
        }
        /**
         * 获取所有子节点
         * @method pageAction
         * @return {[type]}   [description]
         */
    async pageAction() {
            let param = tools.xss(this.post());
            let docs = await this.model("pinpai").page(param.kw, param.cp, param.mp);
            return this.json(docs);
        }
        /**
         *  返回所有的节点列表
         * @method pageallAction
         * @return {[type]}      [description]
         */
    async pageallAction() {
            // let node = await tools.httpAgent(this.config("api") + 'node/pageall', "get");
            let node = await this.model("tree").pageall();
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
        let node = await this.model("tree").get(this.post("id"));
        return this.json(node);
    }

    /**
     * 更新节点
     * @method updateAction
     * @return {[type]}     [description]
     */
    async updateAction() {
        let p = this.post();
        p.id = parseInt(p.id);
        p.weight = parseInt(p.weight);
        // let node = await tools.httpAgent(this.config("api") + 'node', "put", p);
        let node = await this.model("tree").nodeUpdate(p);
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
        p.weight = parseInt(p.weight);
        console.log(p);
        let node = await this.model("pinpai").create(p);
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


}
