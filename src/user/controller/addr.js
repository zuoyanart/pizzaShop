'use strict';

import Base from './base.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let addrM = this.model("home/addr");
        let userid = this.cookie("user_id");
        let addr = await addrM.page(userid,1,20);
        this.assign({
            data: addr.msg
        });
        return this.display();
    }

    async createAction() {
            let province = await think.service("data").getProvince();
            this.assign({
                province: province.result
            });
            return this.display();
        }
        /**
         * 创建或更新收货地址
         * @method editAction
         * @return {[type]}   [description]
         */
    async editAction() {
            let addrM = this.model("home/addr");
            let userid = this.cookie("user_id");
            let addr = xss(this.post());
            addr.user_id = userid;

            let result = await addrM.edit(addr);
            return this.json(result);
        }
        /**
         * 创建或更新收货地址
         * @method editAction
         * @return {[type]}   [description]
         */
    async addAction() {
            let addrM = this.model("home/addr");
            let userid = this.cookie("user_id");
            let addr = xss(this.post());
            addr.user_id = userid;

            let result = await addrM.create(addr);
            return this.json(result);
        }
        /**
         * 创建或更新收货地址
         * @method editAction
         * @return {[type]}   [description]
         */
    async delAction() {
            let addrM = this.model("home/addr");
            let id = this.post("id");

            let result = await addrM.del(id);
            return this.json(result);
        }



        async getAction() {
          let id = this.post("id");
          let addrM = this.model("home/addr");
          let addr = await addrM.get(id);
          return this.json(addr);
        }
        /**
         * 获取
         * @method getcityAction
         * @return {[type]}      [description]
         */
    async getcityAction() {
        let areaid = xss(this.post("areaid"));
        let city = await think.service("data").getCity(areaid);
        return this.json(city);
    }



}
