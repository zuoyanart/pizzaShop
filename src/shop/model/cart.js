'use strict';

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
    async page(userid, cp, mp) {
            let rows = await this.where({
                    "user_id": userid,
                })
                .field("rec_id,goods_id,goods_number")
                .order("rec_id desc").select();
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
    async get(goodsid, userid) {
            let row = await this.where({
                goods_id: goodsid,
                user_id: userid
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
    async editNumber(goodsid, userid, number) {
            let row = await this.where({
                goods_id: goodsid,
                user_id: userid
            }).update({
                goods_number: number
            });
            return {
                state: true
            }
        }
        /**
         * 添加购物车，如果存在则更新数量
         * @method create
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async create(json) {
            let result = await this.get(json.goods_id, json.user_id);
            if (result.msg.goods_id == json.goods_id) { //数据已经存在, 则更新数量
                await this.where({
                    rec_id: result.msg.rec_id
                }).increment("goods_number", json.goods_number);
                return {
                    state: true
                }
            } else { //不存在则添加
                let id = await this.add(json);
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
    async del(userid, goodsid) {
            let row = await this.where({
                "user_id": userid,
                "goods_id": goodsid
            }).delete();
            return {
                state: true
            }
        }
        /**
         * 根据uid清空购物车
         * @method delByUid
         * @param  {[type]} userid [description]
         * @return {[type]}        [description]
         */
    async delByUid(userid) {
        let row = await this.where({
            "user_id": userid
        }).delete();
        return {
            state: true
        }
    }
}
