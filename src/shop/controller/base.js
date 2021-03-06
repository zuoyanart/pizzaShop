'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */
    __before() {
        if (checkMobile(this.userAgent())) { //如果是移动端则跳转到移动端的地址
            let http = this.http;
            let url = http.url;
            this.redirect(url.replace("shop", 'shoptouch'));
        }
    }
}
