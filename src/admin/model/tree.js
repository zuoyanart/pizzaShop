'use strict';
import pinyin from 'node-pinyin';
/**
 * model
 */
export default class extends think.model.base {
    init(...args) {
            super.init(...args);
            this.tableName = "node"; //将对应的数据表名设置为 user2
        }
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
            node.brief = unescape(node.brief);
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
        node.brief = unescape(node.brief);
        let row = await this.where({
            id: node.pid
        }).field("nodepath").find();
        if (!think.isEmpty(row)) {
            let id = await this.add(node);

            let link = node.link;
            if (link.indexOf("http") == -1) {
                let cpinyi = pinyin(node.name, {
                    style: "normal"
                }).join("");

                link = cpinyi + "_" + id + "m" + node.link;
            }

            let nodepath = row.nodepath + id + ','; //生成nodepath
            let eff = await this.where({
                id: id
            }).update({
                nodepath: nodepath,
                link: pinyin(node.name)
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

    async pageall() {
        let rows = await this.where("1=1").order(["pid asc", "weight desc", "id asc"]).select();
        return {
            state: true,
            msg: rows
        };
    }

}
