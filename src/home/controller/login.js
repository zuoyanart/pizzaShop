'use strict';

import Base from './base.js';
export default class extends Base {

    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        return this.display();
    }
    /**
     * 登录
     * @return {[type]} [description]
     */
    async loginAction() {
       let userM = this.model("user");
       let user = xss(this.post());
       let result = await userM.checkUserLogin(user.username, user.password);
       console.log(result);
       if(result.state == true) {
         let data = result.msg;
         let ua = this.userAgent();
         this.cookie("user_username", user.username);
         this.cookie("user_id", data.id);
         this.cookie("user_key", think.md5(user.username + ua + data.id + think.config("salt")), {
             httponly: true
         });
         return this.json({
           state: true
         });
       } else {
         return this.json({
           state: false
         });
       }
    }
}
