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
    async page(kw, cp, mp) {
            let rows = await this.where({
                    title: ["like", "%" + kw + "%"]
                })
                .order("id desc")
                .limit((cp - 1) * mp, mp).select();
            return {
                state: true,
                msg: rows
            };
        }
        /**
         * 获取文章by id
         * @method get
         * @param  {[type]} nodeid [description]
         * @return {[type]}        [description]
         */
    async get(id) {
            let row = await this.where({
                id: id
            }).find();
            return {
                state: true,
                msg: row
            }
        }
        /**
         * 更新节点
         * @method update
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async blockUpdate(block) {
            block.content = unescape(block.content);
            let row = await this.update(block);
            return {
                state: true
            }
        }
        /**
         * 创建节点
         * @method create
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async create(block) {
            block.content = unescape(block.content);
            let id = await this.add(block);
            return {
                state: true,
                msg: id
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
