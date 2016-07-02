'use strict';
/**
 * 商品类型
 */
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
         * 加载tab
         * @method tabAction
         * @return {[type]}  [description]
         */
    tabAction() {
        console.log("asdasd");
        let tab = xss(this.post("tab"));
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
    tabotherAction() {
        return this.display();
    }
    tabattrAction() {
        return this.display();
    }
    tabphotoAction() {
            return this.display();
        }
        /**
         * 获取所有子节点
         * @method pageAction
         * @return {[type]}   [description]
         */
    async pageAction() {
            let param = xss(this.post());
            let node = await this.model("goods").page(param);
            return this.json(node);
        }
        /**
         *  返回所有的节点列表
         * @method pageallAction
         * @return {[type]}      [description]
         */
    async pageallAction() {
            // let node = await httpAgent(this.config("api") + 'node/pageall', "get");
            let node = await this.model("goods").pageall();
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
        let node = await this.model("goods").get(this.post("id"));
        return this.json(node);
    }

    /**
     * 更新节点
     * @method updateAction
     * @return {[type]}     [description]
     */
    async updateAction() {
        let p = xss(this.post());
        let node = await this.model("goods").edit(p);
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
            let p = xss(this.post());
            let node = await this.model("goods").create(p);
            return this.json(node);
        }
        /**
         * 删除品牌
         * @method removeAction
         * @return {[type]}     [description]
         */
    async removeAction() {
        let p = xss(this.post());
        let pinpai = await this.model("goods").remove(p.id);
        return this.json({
            "state": true
        });
    }
    /**
     * 获取相册列表
     * @method pagegalleryAction
     * @return {[type]}          [description]
     */
    async pagegalleryAction() {
      let id = xss(this.post("id"));//商品id
      let gallery = await this.model("goodsgallery").page(id, 1,10);
      return this.json(gallery)

    }


}
