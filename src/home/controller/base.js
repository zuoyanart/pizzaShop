'use strict';

import tools from '../tools/tools.js';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  __before() {
    let username = this.cookie('username');
    let id = this.cookie("id");
    let key = this.cookie('key');
    let ip = this.ip();
    let secureKey = think.md5(username + ip + id + think.config("salt") + this.userAgent());
    if (key !== secureKey) {
       this.redirect('/login');
    }
  }
}
