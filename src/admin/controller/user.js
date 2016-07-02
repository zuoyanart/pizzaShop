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
            let param = xss(this.post());
            // let users = await httpAgent(think.config("api") + 'user/page', "post", "cp=" + param.cp + '&mp=' + param.mp + '&kw=' + param.kw);
            let userAdmins = await this.model("userAdmin").page(param.kw, param.cp, param.mp);
            return this.json(userAdmins);
        }
        /**
         * 获取用户操作
         * @method getAction
         * @return {[type]}  [description]
         */
    async getAction() {
            // let user = await httpAgent(this.config("api") + 'user/' + xss(this.post("id")), "get");
            let user = await this.model("userAdmin").get(this.post("id"));
            return this.json(user);
        }
        /**
         * 编辑用户
         * @method editAction
         * @return {[type]}   [description]
         */
    editAction() {
            return this.display();
        }
        /**
         * 更新用户
         * @method updateAction
         * @return {[type]}     [description]
         */
    async updateAction() {
            let user = xss(this.post());
            user.id = parseInt(user.id);
            // let result = await httpAgent(think.config("api") + 'user', "put", user);
            let result = await this.model("userAdmin").userUpdate(user);
            return this.json(result);
        }
        /**
         * 更新用户
         * @method updateAction
         * @return {[type]}     [description]
         */
    async createAction() {
            let us = xss(this.post());
            // let user = await httpAgent(this.config("api") + 'user', "post", us);
            let user = await this.model("userAdmin").create(us);
            return this.json({
                "state": true
            });
        }
        /**
         * 删除用户
         * @method removeAction
         * @return {[type]}     [description]
         */
    async removeAction() {
            let id = xss(this.post("id")).replace(/,0/, "");
            // let result = await httpAgent(think.config("api") + 'user', "del", "id=" + id);
            let result = await this.model("userAdmin").del(id);
            return this.json(result);
        }
        /**
         * 审核用户
         * @method passAction
         * @return {[type]}   [description]
         */
    passAction() {
        return this.json({
            "state": true
        });
    }

}
