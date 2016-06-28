'use strict';

import Base from './base.js';
import tools from '../tools/tools.js';
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
      let param = tools.xss(this.post());
      let result = await tools.httpAgent(think.config("api") + "role/page", "post", tools.httpParam(param));
      return this.json(result);
    }
    /**
     * 获取用户组操作
     * @method getAction
     * @return {[type]}  [description]
     */
  async getAction() {
      let user = await tools.httpAgent(this.config("api") + 'role/' + tools.xss(this.post("id")), "get");
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
      let role = tools.xss(this.post());
      role.id = parseInt(role.id);
      role.state = parseInt(role.state);
      let result = await tools.httpAgent(think.config("api") + 'role', "put", role);
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
      us.groupid = parseInt(us.groupid);
      let user = await tools.httpAgent(this.config("api") + 'role', "post", us);
      return this.json(user);
    }
    /**
     * 删除用户组
     * @method removeAction
     * @return {[type]}     [description]
     */
  async removeAction() {
      let id = tools.xss(this.post("id")).replace(/,0/, "");
      let result = await tools.httpAgent(think.config("api") + 'role', "del", "id=" + id);
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
