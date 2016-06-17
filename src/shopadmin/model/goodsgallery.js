'use strict';
/**
 * 商品相册
 */
export default class extends think.model.base {
    init(...args) {
            super.init(...args);
            this.tableName = "goods_gallery";
            this.pk = "img_id"; //设置主键
        }
        /**
         *  获取商品所有的图片
         * @method checkUserLogin
         * @param  {[type]}       username [description]
         * @param  {[type]}       password [description]
         * @return {[type]}                [description]
         */
    async page(goodsid, cp, mp) {
            let data = await this.where({
                    goods_id: goodsid
                })
                .order(["img_id desc"])
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
                state: true
            }
        }
        /**
         * 获取所有的分类列表
         * @method pageall
         * @return {[type]} [description]
         */
    async remove(goodsid) {
        let row = await this.where({
            goods_id: goodsid
        }).delete();
        return {
            state: true
        }
    }

}
