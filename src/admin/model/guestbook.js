'use strict';
/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
            super.init(...args);
            this.pk = "gbid";
        }
        /**
         *  根据父节点获取所有子节点
         * @method checkUserLogin
         * @param  {[type]}       username [description]
         * @param  {[type]}       password [description]
         * @return {[type]}                [description]
         */
    async page(kw, cp, mp) {
            let rows = await this.where({
                    des: ["like", "%" + kw + "%"]
                })
                .order("gbid desc")
                .limit((cp - 1) * mp, mp).select();
            return {
                state: true,
                msg: rows
            };
        }
        /**
         * 获取留言板by id
         * @method get
         * @param  {[type]} nodeid [description]
         * @return {[type]}        [description]
         */
    async get(id) {
            let row = await this.where({
                gbid: id
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
            let row = await this.where({
                "gbid": json.gbid
            }).update(json);
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
                gbid: ["IN", id.split(',')]
            }).update({
                pass: ispass
            });
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
         * 删除留言板
         * @method del
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
    async del(id) {
        let row = await this.where({
            gbid: ["IN", id.split(',')]
        }).delete();
        return {
            state: true
        }
    }

}
