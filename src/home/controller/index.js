'use strict';

import Base from './base.js';
import config from '../config/config.js';
import mail from '../tools/mail.js';
import tools from '../tools/tools.js';
import data from '../tools/data.js';
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
     * 发送mail
     * @method mailAction
     * @return {[type]}   [description]
     */
  mailAction() {
    let _self = this;
    superagent.get('http://www.baidu.com').end(function(err, res) {
      if (err) { //发送邮件
        let ml = new mail();
        ml.sendMail(config.mail.to, '首页响应', '网站首页响应失败，请迅速检查').then(function(msg) {
          _self.end(msg);
        });
      } else {
        _self.success();
      }
    });
  }

  async pageAction() {
    let requests = [];
    requests.push(data.pageArticle(8,"",1,10));
    requests.push(data.pageArticle(12,"",1,1));
    requests.push(data.pageArticle(10,"",1,1));
    requests.push(data.pageArticle(7,"",1,1));
    requests.push(data.getBlock(1));
    requests.push(data.getBlock(2));
    requests.push(data.getBlock(3));
    requests.push(data.getBlock(4));
    requests.push(data.getBlock(5));
    requests.push(data.getBlock(6));
    let result = await Promise.all(requests);
    this.assign({
      a1: result[0].msg,
      a2: result[1].msg,
      a3: result[2].msg,
      a4: result[3].msg,
      a5: result[4].msg,
      a6: result[5].msg,
      a7: result[6].msg,
      a8: result[7].msg,
      a9: result[8].msg,
      a10: result[9].msg
    });
    return this.display();
  }
}
