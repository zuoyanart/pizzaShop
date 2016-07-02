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
     * page article
     * @method pageAction
     * @return {[type]}   [description]
     */
  async pageAction() {
      let param = xss(this.post());
      let results = await httpAgent(think.config("api") + 'usergroup/page', "post", "cp=" + param.cp + '&mp=' + param.mp + '&kw=' + param.kw);
      return this.json(results);
    }
    /**
     * 获取用户组操作
     * @method getAction
     * @return {[type]}  [description]
     */
  async getAction() {
      let user = await httpAgent(this.config("api") + 'usergroup/' + xss(this.post("id")), "get");
      return this.json(user);
    }
    /**
     * 编辑用户组
     * @method editAction
     * @return {[type]}   [description]
     */
  editAction() {
      return this.display();
    }
    /**
     * 更新用户组
     * @method updateAction
     * @return {[type]}     [description]
     */
  async updateAction() {
      let userGroup = xss(this.post());
      userGroup.id = parseInt(userGroup.id);
      userGroup.state = parseInt(userGroup.state);
      let result = await httpAgent(think.config("api") + 'usergroup', "put", userGroup);
      return this.json(result);
    }
    /**
     * 添加用户组
     * @method updateAction
     * @return {[type]}     [description]
     */
  async createAction() {
      let us = this.post();
      us.state = parseInt(us.state);
      let user = await httpAgent(this.config("api") + 'usergroup', "post", us);
      return this.json(user);
    }
    /**
     * 删除用户组
     * @method removeAction
     * @return {[type]}     [description]
     */
  async removeAction() {
      let id = xss(this.post("id")).replace(/,0/, "");
      let result = await httpAgent(think.config("api") + 'usergroup', "del", "id=" + id);
      return this.json(result);
    }
    /**
     * 冻结用户组
     * @method passAction
     * @return {[type]}   [description]
     */
  passAction() {
    return this.json({
      "state": true
    });
  }


}
