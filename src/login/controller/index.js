'use strict';

import Base from './base.js';
import tools from "../../home/tools/tools.js"

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
         * 登录操作
         * @method loginAction
         * @return {[type]}    [description]
         */
    async loginAction() {
            let data = this.post();
            let model = this.model("user");
            let user = await model.checkUserLogin(data.name, data.password);
            if (user.state == true) {
                let msg = user.msg;
                let ip = this.ip();
                this.cookie("username", data.name);
                this.cookie("id", msg.id);
                this.cookie("key", think.md5(data.name + ip + msg.id + think.config("salt") + this.userAgent()), {
                    httponly: true
                });
                return this.json({
                    "state": true
                });
            } else {
                return this.json({
                    "state": false
                });
            }

        }
        /**
         * 退出登录
         * @method loginoutAction
         * @return {[type]}       [description]
         */
    loginoutAction() {
        return this.json({
            "state": true
        });
    }

    async testAction() {
        // let data = {"a":"b"};
        console.log("asdasd");
        let model = this.model("user");
        console.log(model);
        let data = await model.where({
            "username": "root"
        }).find();
        return this.json(data);
    }
}
