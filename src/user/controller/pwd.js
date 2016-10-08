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
     * 校验是否是原先的密码
     * @method checkAction
     * @return {[type]}    [description]
     */
    async checkAction() {
       let oldpassword = xss(this.post("oldpassword"));
       let username = this.cookie("user_username");
       let userM = this.model("home/user");
       let ischeck = await userM.checkUserLogin(username, oldpassword);
       if(ischeck.state == true) {
         return this.json({
           state: "true"
         });
       } else {
         return this.json({
           state: "false"
         });
       }
    }
    /**
     * 更新密码
     * @method editAction
     * @return {[type]}   [description]
     */
    async editAction() {
      let oldpassword = xss(this.post("oldpassword"));//老密码
      let password = xss(this.post("password"));//新密码

      let username = this.cookie("user_username");
      let uid = this.cookie("user_id");

      let userM = this.model("home/user");
      let ischeck = await userM.checkUserLogin(username, oldpassword);
      if(ischeck.state == true) {
        let user = {
          id: uid,
          password: password
        };
        let result = await userM.userUpdate(user);
        return this.json(result);
      } else {
        return this.json({
          state: false,
          msg:"原密码不正确"
        });
      }
    }
}
