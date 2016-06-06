'use strict';
/**
 * 商品类型
 */
import Base from './base.js';
import tools from '../../common/tools/tools.js';
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
         * 加载tab
         * @method tabAction
         * @return {[type]}  [description]
         */
    tabAction() {
        console.log("asdasd");
        let tab = tools.xss(this.post("tab"));
        let s = '<iframe src="/shopadmin/goods/tab' + tab + '" scrolling="no"></iframe>';
        return this.json({
            "state": true,
            msg: s
        });
    }
    tabcommonAction() {
        return this.display();
    }
    tabinfoAction() {
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
            let node = await this.model("goods").page(param);
            return this.json(node);
        }
        /**
         *  返回所有的节点列表
         * @method pageallAction
         * @return {[type]}      [description]
         */
    async pageallAction() {
            // let node = await tools.httpAgent(this.config("api") + 'node/pageall', "get");
            let node = await this.model("goodstype").pageall();
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
        let node = await this.model("goodstype").get(this.post("id"));
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
        let node = await this.model("goodstype").edit(p);
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
            let node = await this.model("goods").create(p);
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
        let p = tools.xss(this.post());
        let pinpai = await this.model("goodstype").remove(p.id);
        return this.json({
            "state": true
        });

    }


}
