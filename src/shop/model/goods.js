'use strict';
import tools from '../../common/tools/tools.js';
/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
            super.init(...args);
            this.pk = "goods_id";
        }
        /**
         *  根据父节点获取所有子节点
         * @method checkUserLogin
         * @param  {[type]}       username [description]
         * @param  {[type]}       password [description]
         * @return {[type]}                [description]
         */
    async page(params) {
            let defaultJson = {
                catid: 0,
                pinpai: 0,
                status: -1,
                is_on_sale: 1,
                kw: "",
                cp:1,
                mp:10
            };
            let paramJson = {};
            params = tools.mergeJson(params, defaultJson);

            if (params.catid != 0) { //商品分类
                paramJson.cat_id = params.catid;
            }

            if (params.pinpai != 0) { //品牌
                paramJson.brand_id = params.pinpai;
            }

            switch (params.status) { //筛选热销，精品，新品等
                case 0: //热销
                    paramJson.is_hot = 1;
                    break;
                case 1: //新品
                    paramJson.is_new = 1;
                    break;
                case 2: //精品
                    paramJson.is_best = 1;
                    break;
            }
            paramJson.goods_name = ["like", "%" + params.kw + "%"];

            let data = await this.where(
                    paramJson
                )
                .limit((params.cp - 1) * params.mp, params.mp)
                .select();
            return {
                state: true,
                msg: data
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
