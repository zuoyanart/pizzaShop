'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */
    __before() {
        if (!checkMobile(this.userAgent())) { //如果不是移动端则跳转到pc端的地址
            let http = this.http;
            let url = http.url;
            this.redirect(url.replace("shoptouch", 'shop'));
        }
    }
}
