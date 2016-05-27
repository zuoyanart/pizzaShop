'use strict';

import tools from './tools.js';


export default class {
  /**
   * page article
   * @method pageArticle
   * @param  {[type]}    nodeid [description]
   * @param  {[type]}    kw     [description]
   * @param  {[type]}    cp     [description]
   * @param  {[type]}    mp     [description]
   * @return {[type]}           [description]
   */
  static async pageArticle(nodeid, kw, cp, mp) {
    return tools.httpAgent(think.config("api") + 'article/page', "post", "kw=" + kw + "&cp=" + cp + "&mp=" + mp + "&nodeid=" + nodeid);
  }
/**
 * get 文章
 * @method getArticle
 * @param  {[type]}   id [description]
 * @return {[type]}      [description]
 */
  static async getArticle(id) {
    return tools.httpAgent(think.config("api") + 'article/' +id, "get");
  }
  /**
   * get 模块
   * @method getArticle
   * @param  {[type]}   id [description]
   * @return {[type]}      [description]
   */
    static async getBlock(id) {
      return tools.httpAgent(think.config("api") + 'block/' +id, "get");
    }



}
