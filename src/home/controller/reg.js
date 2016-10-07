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
     * 注册
     * @return {[type]} [description]
     */
    async regAction() {
      let userM =  this.model("user");
      let user = xss(this.post());
      let ischeck = await userM.checkUser(user.username);
      if(ischeck.state == true && ischeck.msg.username == user.username) {
        return this.json({
          state: false,
          msg: "该账户已经注册"
        });
      }
      user.reg_time = getUnixTime();
      user.last_login = user.reg_time;
      user.last_ip = this.ip();
      user.state = 1;
      let result = await userM.create(user);
      return this.json(result);
    }
/**
 * 校验是否已经注册
 * @return {[type]} [description]
 */
    async checkAction() {
      let userM =  this.model("user");
      let user = xss(this.post());
      let ischeck = await userM.checkUser(user.username);
      console.log(ischeck.state);
      console.log(ischeck.msg.id);
      if(ischeck.state == true && ischeck.msg.username == user.username) {
        return this.json({
          state: "false",
          msg: "该账户已经注册"
        });
      } else {
        return this.json({
          state: "true"
        });
      }
    }
}
