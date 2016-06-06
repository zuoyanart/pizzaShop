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
         * 获取所有子节点
         * @method pageAction
         * @return {[type]}   [description]
         */
    async pageallAction() {
            let docs = await this.model("pinpai").pageAll();
            return this.json(docs);
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
        // let pinpai = await tools.httpAgent(this.config("api") + 'pinpai/' + this.post("id"), "get");
        let pinpai = await this.model("pinpai").get(this.post("id"));
        return this.json(pinpai);
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
        // let pinpai = await tools.httpAgent(this.config("api") + 'pinpai', "put", p);
        let pinpai = await this.model("pinpai").edit(p);
        if (pinpai.state == true) {
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
            let pinpai = await this.model("pinpai").create(p);
            if (pinpai.state == true) {
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
        let p = tools.xss(this.post());
        let pinpai = await this.model("pinpai").remove(p.id);
        return this.json({
            "state": true
        });

    }


}
