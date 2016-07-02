'use strict';

import Base from './base.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
            //auto render template file index_index.html
            return this.display();
        }
        /**
         * 获取所有子节点
         * @method pageAction
         * @return {[type]}   [description]
         */
    async pageAction() {
            let pid = xss(this.post("pid"));
            let power = await httpAgent(this.config("api") + 'power/page', "post", "pid=" + this.post("pid"));
            return this.json(power);
        }
        /**
         *  返回所有的节点列表
         * @method pageallAction
         * @return {[type]}      [description]
         */
    async pageallAction() {
            let power = await httpAgent(this.config("api") + 'power/pageall', "get");
            return this.json(power);
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
        let power = await httpAgent(this.config("api") + 'power/' + this.post("id"), "get");
        return this.json(power);
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
        let power = await httpAgent(this.config("api") + 'power', "put", p);
        if (power.state == true) {
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
        let power = await httpAgent(this.config("api") + 'power', "post", p);
        if (power.state == true) {
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
