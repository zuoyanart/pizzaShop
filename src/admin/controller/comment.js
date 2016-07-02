'use strict';

import Base from './base.js';
export default class extends Base {
    /**
     * 获取评论列表
     * @method commentAction
     * @return {[type]}      [description]
     */
    async pageAction() {
            let param = xss(this.post());
            // let result = await tools.httpAgent(think.config("api") + "comment/page", "post", "id=" + param.id + "&cp=" + param.cp + "&mp=" + param.mp);
            let result = await this.model("comment").page(param.id, param.cp, param.mp);
            return this.json(result)
        }
        /**
         * 删除文章评论
         * @method delAction
         * @return {[type]}  [description]
         */
    async delAction() {
        let id = xss(this.post("id"));
        // let result = await tools.httpAgent(think.config("api") + "comment", "del", "id=" + id);
        let result = await this.model("comment").del(id);
        return this.json(result);
    }

}
