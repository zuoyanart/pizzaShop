'use strict';
import tools from '../../common/tools/tools.js';
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
    async page(params) {
            var paramJson = {};
            // if (params.catid != 0) { //商品分类
            //     paramJson.catid = params.catid;
            // }
            // if (params.pinpai != 0) { //品牌
            //     paramJson.pinpaiId = params.pinpai;
            // }
            // if (params.status != 0) { //筛选热销，精品，新品等
            //     paramJson.status = 1;
            // }
            // if (params.issale) { //是否上架
            //     paramJson.isOnSale = params.issale;
            // }

            paramJson.name = ["like", "%" + params.kw + "%"];

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
            if (think.config("openApi")) {
                let article = await tools.httpAgent(this.config("api") + 'article/' + parseInt(id), "get");
                return article;
            } else {
                let row = await this.where({
                    id: id
                }).find();
                return {
                    state: true,
                    msg: row
                }
            }
        }
        /**
         * 更新节点
         * @method update
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async articleUpdate(article) {
            if (think.config("openApi")) {
                let article = await tools.httpAgent(this.config("api") + 'article', "put", article);
                return article;
            } else {
                let row = await this.update(article);
                return {
                    state: true
                }
            }
        }
        /**
         * 创建节点
         * @method create
         * @param  {[type]} node [description]
         * @return {[type]}      [description]
         */
    async create(article) {
            let id = await this.add(article);
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
            id: ["IN", id.split(',')]
        }).delete();
        return {
            state: true
        }
    }




}
