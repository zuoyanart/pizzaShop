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
         * page article
         * @method pageAction
         * @return {[type]}   [description]
         */
    async pageAction() {
            // let article = await tools.httpAgent(this.config("api") + 'article/page', "post", "kw=" + this.post("kw") + "&cp=" + this.post("cp") + "&mp=" + this.post("mp") + "&nodeid=" + this.post("nodeid"));
            let param = xss(this.post());
            let article = await this.model("article").page(param.kw, param.nodeid, param.cp, param.mp);
            return this.json(article);
        }
        /**
         * 获取文章操作
         * @method getAction
         * @return {[type]}  [description]
         */
    async getAction() {
            // let article = await tools.httpAgent(this.config("api") + 'article/' + parseInt(this.post("id")), "get");
            let article = await this.model("article").get(xss(this.post("id")));
            return this.json(article);
        }
        /**
         * 编辑文章
         * @method editAction
         * @return {[type]}   [description]
         */
    editAction() {
            return this.display();
        }
        /**
         * 更新文章
         * @method updateAction
         * @return {[type]}     [description]
         */
    async updateAction() {
            let up = this.post();
            up.nodeid = parseInt(up.nodeid);
            up.pass = parseInt(up.pass);
            up.reco = parseInt(up.reco);
            up.id = parseInt(up.id);
            // let article = await tools.httpAgent(this.config("api") + 'article', "put", up);
            let article = await this.model("article").articleUpdate(up);
            return this.json({
                "state": true
            });
        }
        /**
         * 更新文章
         * @method updateAction
         * @return {[type]}     [description]
         */
    async createAction() {
            let up = this.post();
            up.nodeid = parseInt(up.nodeid);
            up.pass = parseInt(up.pass);
            up.reco = parseInt(up.reco);
            up.uid = parseInt(this.cookie("id"));
            up.createtime = getUnixTime();
            // let article = await tools.httpAgent(this.config("api") + 'article', "post", up);
            let article = await this.model("article").create(up);
            return this.json({
                "state": true
            });
        }
        /**
         * 删除文章
         * @method removeAction
         * @return {[type]}     [description]
         */
    async removeAction() {
            let param = xss(this.post());
            // let result = await tools.httpAgent(think.config("api") + "article", "del", "id=" + param.id);
            let result = await this.model("article").del(param.id);
            return this.json(result);
        }
        /**
         * 审核文章
         * @method passAction
         * @return {[type]}   [description]
         */
    async passAction() {
        let param = xss(this.post());
        let pass = param.ispass == "true" ? 1 : 0;
        // let result = await tools.httpAgent(think.config("api") + "article/pass", "post", "id=" + param.id + "&pass=" + pass);
        let result = await this.model("article").pass(param.id, pass);
        return this.json(result);
    }

}
