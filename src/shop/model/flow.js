'use strict';
import tools from '../../common/tools/tools.js';
/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
            super.init(...args);
            this.pk = "rec_id";
        }
        /**
         *  获取所有商品
         * @method checkUserLogin
         * @param  {[type]}       username [description]
         * @param  {[type]}       password [description]
         * @return {[type]}                [description]
         */
    async page(query, option) {
            let rows = await this.alias("cart").join({
                    table: 'goods',
                    join: 'inner',
                    on: ["goods.goods_id", "cart.goods_id"]
                }).where({
                    "goodsid": goodsid,
                    "attr.attrvalue": {
                        "!=": ""
                    },
                    "typeattr.attrtype": 0
                })
                .field("attr.attrvalue, typeattr.attrname")
                .order("goods_attr_id asc").select();
            return {
                state: true,
                msg: rows
            }
        }
        /**
         * 获取文章by id
         * @method get
         * @param  {[type]} nodeid [description]
         * @return {[type]}        [description]
         */
    async get(id) {
            let row = await this.where({
                goods_id: id,
                is_on_sale: 1
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
            if (!json.goods_sn || json.goods_sn == '') {
                json.goods_sn = 'ASU' + Date.parse(new Date()).toString().replace('000', '');
            }
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
