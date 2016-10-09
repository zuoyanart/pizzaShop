'use strict';

/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
            super.init(...args);
            this.pk = "rec_id";
            this.tableName = "order_goods";
        }
        /**
         * 获取订单by id
         * @method get
         * @param  {[type]} nodeid [description]
         * @return {[type]}        [description]
         */
    async get(id) {
            let row = await this.where({
                order_id: id
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
    async edit(json) {
            let row = await this.update(json);
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
    async create(json) {
            let id = await this.add(json);
            return {
                state: true,
                msg: id
            }
        }
        /**
         * 更新审核状态
         * @method pass
         * @param  {[type]} id     [description]
         * @param  {[type]} ispass [description]
         * @return {[type]}        [description]
         */
    async updateGoodsType(id, goodstype) {
            let row = await this.where({
                goods_id: id
            }).update({
                goods_type: goodstype
            });
            return {
                state: true
            }
        }
        /**
         * 删除订单
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
