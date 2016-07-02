'use strict';

/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
            super.init(...args);
            this.tableName = "goods_attr"; //将对应的数据表名设置为 user2
            this.pk = "goods_attr_id";
        }
        /**
         *  根据父节点获取所有子节点
         * @method checkUserLogin
         * @param  {[type]}       username [description]
         * @param  {[type]}       password [description]
         * @return {[type]}                [description]
         */
    async page(goodsid) {
            // let data = await this.where({
            //         goodsid: goodsid
            //     })
            //     .select();
            // return {
            //     state: true,
            //     msg: data
            // }

            let rows = await this.alias("attr").join({
                table: 'goods_type_attr',
                as: "typeattr",
                join: 'inner',
                on: ["attr.attrid", "typeattr.attrid"]
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
                goods_id: id
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
                state: true
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
            goodsid: id
        }).delete();
        return {
            state: true
        }
    }

}
