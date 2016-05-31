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
            let data = await this.where({
                    title: ["like", "%" + kw + "%"]
                })
                .limit((cp - 1) * mp, mp)
                .select();
            return {
                state: true,
                msg: data
            }
        }
        /**
         * 获取节点by id
         * @method get
         * @param  {[type]} nodeid [description]
         * @return {[type]}        [description]
         */
    async get(nodeid) {
            let row = await this.where({
                id: nodeid
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
    async nodeUpdate(node) {
            let row = await this.update(node);
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
    async create(pinpai) {
            let id = await this.add(pinpai);
            return {
                state: true,
                msg: id
            }
        }
        /**
         * 获取所有的分类列表
         * @method pageall
         * @return {[type]} [description]
         */
    async pageall() {
        let rows = await this.where("1=1").order(["pid asc", "weight desc", "id asc"]).select();
        return {
            state: true,
            msg: rows
        };
    }

}
