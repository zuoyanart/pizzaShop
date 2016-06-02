'use strict';
/**
 * 商品类型
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
                    catname: ["like", "%" + kw + "%"]
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
    async edit(goodstype) {
            let row = await this.update(goodstype);
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
    async create(goodstype) {
            let id = await this.add(goodstype);
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
    async remove(id) {
        let row = await this.where({
            id: ["IN", id.split(',')]
        }).delete();
        return {
            state: true
        }
    }

}
