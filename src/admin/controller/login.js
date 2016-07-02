'use strict';

import LoginBase from './loginbase.js';

export default class extends LoginBase {
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
            let data = xss(this.post());
            let model = this.model("userAdmin");
            let user = await model.checkUserLogin(data.name, data.password);
            if (user.state == true) {
                let msg = user.msg;
                // let ip = this.ip();
                let ua = this.userAgent();
                this.cookie("username", data.name);
                this.cookie("id", msg.id);
                this.cookie("key", think.md5(data.name + ua + msg.id + think.config("salt")), {
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
        this.cookie("id", null);
        this.cookie("key", null);
        this.cookie("username", null);
        return this.json({
            "state": true
        });
    }
}
