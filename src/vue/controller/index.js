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
      var user = await tools.httpAgent(think.config("api") + 'user/login', "post", "username=" + this.post("name") + "&password=" + this.post("password"));
      if (user.state == true) {
        let msg = user.msg;
        let ip = this.ip();
         this.cookie("username", msg.username);
         this.cookie("id", msg.id);
         this.cookie("key", think.md5(msg.username + ip + msg.id + think.config("salt")), {
           httponly: true
         });
        return this.json({"state": true});
      } else {
        return this.json({"state": false});
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
}
