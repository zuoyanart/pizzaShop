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

    async getAction() {
        let userM = this.model("home/user");
        let user = await userM.get(this.cookie("user_id"));
        return this.json(user);
    }

    async editAction() {
        let userM = this.model("home/user");
        let user = xss(this.post());
        user.id = this.cookie("user_id");
        let result = await userM.userUpdate(user);
        return this.json(result);
    }
}
