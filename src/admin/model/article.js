'use strict';
/**
 * model
 */
export default class extends think.model.base {
    /**
     *  根据父节点获取所有子节点
     * @method checkUserLogin
     * @param  {[type]}       username [description]
     * @param  {[type]}       password [description]
     * @return {[type]}                [description]
     */
    async page(kw, nodeid, cp, mp) {
            if (think.config("openApi")) {
                let article = await httpAgent(this.config("api") + 'article/page', "post", "kw=" + kw + "&cp=" + cp + "&mp=" + mp + "&nodeid=" + nodeid);
                return article;
            } else {
                let rows = await this.join({
                        table: "node",
                        as: "node",
                        join: "inner",
                        on: ["nodeid", "node.id"]
                    }).join({
                        table: "user_admin",
                        as: "user",
                        join: "inner",
                        on: ["uid", "id"]
                    })
                    .where({
                        "node.nodepath": ["like", "%," + nodeid + ",%"],
                        "title": ["like", "%" + kw + "%"]
                    }).field("pz_article.*,node.name as nodename,user.username")
                    .order("id desc")
                    .limit((cp - 1) * mp, mp).select();

                return {
                    state: true,
                    msg: rows
                };
            }
        }
        /**
         * 获取文章by id
         * @method get
         * @param  {[type]} nodeid [description]
         * @return {[type]}        [description]
         */
    async get(id) {
            if (think.config("openApi")) {
                let article = await httpAgent(this.config("api") + 'article/' + parseInt(id), "get");
                return article;
            } else {
                let row = await this.where({
                    id: id
                }).find();
                return {
                    state: true,
                    msg: row
                }
            }
        }
        /**
         * 更新节点
         * @method update
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async articleUpdate(article) {
            if (think.config("openApi")) {
                let article = await httpAgent(this.config("api") + 'article', "put", article);
                return article;
            } else {
                let row = await this.update(article);
                return {
                    state: true
                }
            }
        }
        /**
         * 创建节点
         * @method create
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async create(article) {
            if (think.config("openApi")) {
                let article = await httpAgent(this.config("api") + 'article', "put", article);
                return article;
            } else {
                let id = await this.add(article);
                return {
                    state: true,
                    msg: id
                }
            }
        }
        /**
         * 更新审核状态
         * @method pass
         * @param  {[type]} id     [description]
         * @param  {[type]} ispass [description]
         * @return {[type]}        [description]
         */
    async pass(id, ispass) {
            let row = await this.where({
                id: ["IN", id.split(',')]
            }).update({
                pass: ispass
            });
            return {
                state: true
            }
        }
        /**
         * 删除文章
         * @method del
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
    async del(id) {
        let row = await this.where({
            id: ["IN", id.split(',')]
        }).delete();
        return {
            state: true
        }
    }




}
