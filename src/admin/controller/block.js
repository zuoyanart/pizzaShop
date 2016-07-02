'use strict';

import Base from './base.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    /**
     * index action
     * @return {Promise} []
     */
    editAction() {
        //auto render template file index_index.html
        return this.display();
    }

    async pageAction() {
        let param = xss(this.post());
        // let block = await tools.httpAgent(think.config("api") + 'block/page', "post", "kw=" + this.post("kw") + "&cp=" + this.post("cp") + "&mp=" + this.post("mp"));
        let block = await this.model("block").page(param.kw, param.cp, param.mp);
        return this.json(block)
    }

    async createAction() {
        let param = this.post();
        // let block = await tools.httpAgent(think.config("api") + 'block', "post", param);
        let block = await this.model("block").create(param);
        return this.json(block)
    }

    async getAction() {
        let param = xss(this.post());
        // let block = await tools.httpAgent(think.config("api") + 'block/' + param.id, "get");
        let block = await this.model("block").get(param.id);
        return this.json(block)
    }

    async updateAction() {
        let param = this.post();
        param.id = parseInt(param.id);
        // let block = await tools.httpAgent(think.config("api") + 'block', "put", param);
        let block = await this.model("block").blockUpdate(param);
        return this.json(block)
    }

    async removeAction() {
        let param = xss(this.post());
        // let block = await tools.httpAgent(think.config("api") + 'block', "del", "id=" + param.id);
        let block = await this.model("block").del(param.id);
        return this.json(block)
    }

}
