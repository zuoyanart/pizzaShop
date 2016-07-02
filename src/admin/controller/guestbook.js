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
         * page guestbook
         * @method pageAction
         * @return {[type]}   [description]
         */
    async pageAction() {
            let param = xss(this.post());
            let guestbook = await this.model("guestbook").page(param.kw, param.cp, param.mp);
            return this.json(guestbook);
        }
        /**
         * 获取留言板操作
         * @method getAction
         * @return {[type]}  [description]
         */
    async getAction() {
            // let guestbook = await tools.httpAgent(this.config("api") + 'guestbook/' + parseInt(this.post("id")), "get");
            let guestbook = await this.model("guestbook").get(xss(this.post("id")));
            return this.json(guestbook);
        }
        /**
         * 编辑留言板
         * @method editAction
         * @return {[type]}   [description]
         */
    editAction() {
            return this.display();
        }
        /**
         * 更新留言板
         * @method updateAction
         * @return {[type]}     [description]
         */
    async updateAction() {
            let up = xss(this.post());
            up.pass = parseInt(up.pass);
            up.gbid = parseInt(up.id);
            up.brief = up.username.replace(/$/g, '') + '$' + up.phone.replace(/$/g, '') + "$" + up.mail.replace(/$/g, '') + "$" + up.addr.replace(/$/g, '');
            let guestbook = await this.model("guestbook").edit(up);
            return this.json({
                "state": true
            });
        }
        /**
         * 更新留言板
         * @method updateAction
         * @return {[type]}     [description]
         */
    async createAction() {
            let up = xss(this.post());
            up.pass = parseInt(up.pass);
            up.uid = parseInt(this.cookie("id"));
            up.createtime = Math.round(new Date().getTime() / 1000);
            up.brief = up.username.replace(/$/g, '') + '$' + up.phone.replace(/$/g, '') + "$" + up.mail.replace(/$/g, '') + "$" + up.addr.replace(/$/g, '');
            let guestbook = await this.model("guestbook").create(up);
            return this.json({
                "state": true
            });
        }
        /**
         * 删除留言板
         * @method removeAction
         * @return {[type]}     [description]
         */
    async removeAction() {
            let param = xss(this.post());
            // let result = await tools.httpAgent(think.config("api") + "guestbook", "del", "id=" + param.id);
            let result = await this.model("guestbook").del(param.id);
            return this.json(result);
        }
        /**
         * 审核留言板
         * @method passAction
         * @return {[type]}   [description]
         */
    async passAction() {
        let param = xss(this.post());
        let pass = param.ispass == "true" ? 1 : 0;
        let result = await this.model("guestbook").pass(param.id, pass);
        return this.json(result);
    }

}
