'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  __before() {
    let username = this.cookie('username');
    let id = this.cookie("id");
    let key = this.cookie('key');
    let ua = this.userAgent();
    let secureKey = think.md5(username + ua + id + think.config("salt"));
    if (key !== secureKey) {
       this.redirect('/admin/login');
       return this.end();
    }
  }
}
