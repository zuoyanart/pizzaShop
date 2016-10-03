'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  __before() {
    let username = this.cookie('user_username');
    let id = this.cookie("user_id");
    let key = this.cookie('user_key');
    let ua = this.userAgent();
    let secureKey = think.md5(username + ua + id + think.config("salt"));
    if (key !== secureKey && false) {
       this.redirect('/user/login');
       return this.end();
    }
  }
}
