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
    async page(articleid, cp, mp) {
            let rows = await this.where({
                    articleid: articleid
                })
                .order("id desc")
                .limit((cp - 1) * mp, mp).countSelect();
            return {
                state: true,
                msg: rows.data,
                count: rows.count
            };
        }
        /**
         * 删除文章
         * @method del
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
    async del(id) {
        let row = await this.where({
            id: id
        }).delete();
        return {
            state: true
        }
    }




}
