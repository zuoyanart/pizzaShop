'use strict';
/**
 * 商品类型
 */
export default class extends think.model.base {
    init(...args) {
            super.init(...args);
            this.tableName = "goods_type_attr";
            this.pk = "attrid"; //设置主键
        }
        /**
         *  根据父节点获取所有子节点
         * @method checkUserLogin
         * @param  {[type]}       username [description]
         * @param  {[type]}       password [description]
         * @return {[type]}                [description]
         */
    async page(kw, catid, cp, mp) {
            let data = await this.where({
                    attrname: ["like", "%" + kw + "%"],
                    catid: catid,
                })
                .order(["weight desc", "attrid asc"])
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
                attrid: id
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
    async edit(dataobj) {
            let row = await this.update(dataobj);
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
    async create(dataobj) {
            let id = await this.add(dataobj);
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
