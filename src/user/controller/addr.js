'use strict';

import Base from './base.js';
export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    let province = await httpAgent("http://api.avatardata.cn/SimpleArea/LookUp?key=57a0631edb7c4929bc15215c9d6eb328&parentId=", "get");
    this.assign({
      province: province.result
    });
      return this.display();
    }

    async getcityAction() {
      let areaid = xss(this.post("areaid"));
      let city = await httpAgent("http://api.avatardata.cn/SimpleArea/LookUp?key=57a0631edb7c4929bc15215c9d6eb328&parentId=" + areaid, "get");
        return this.json(city);
    }



}
