'use strict';
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
    async page(pid) {
            let rows = await this.where({
                "pid": pid
            }).select();
            return {
                state: true,
                msg: rows
            }
        }
        /**
         * 获取节点by id
         * @method get
         * @param  {[type]} nodeid [description]
         * @return {[type]}        [description]
         */
    async get(nodeid) {
            let row = await this.where({
                id: nodeid
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
    async nodeUpdate(node) {
            let row = await this.update(node);
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
    async create(node) {
        let row = await this.where({
            id: node.pid
        }).field("nodepath").find();
        if (!think.isEmpty(row)) {
            let id = await this.add(node);
            let nodepath = row.nodepath + id + ',';
            let eff = await this.where({
                id: id
            }).update({
                nodepath: nodepath
            });
            return {
                state: true,
                msg: id
            }
        } else {
            return {
                state: false
            };
        }
    }
    /**
     * 获取所有的分类列表
     * @method pageall
     * @return {[type]} [description]
     */
    async pageall() {
        let rows = await this.where("1=1").order(["pid asc", "weight desc", "id asc"]).select();
        return {
            state: true,
            msg: rows
        };
    }

}
