'use strict';

import Base from './base.js';
import tools from '../../common/tools/tools.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let data = await tools.httpSpider("https://www.google.com.hk/search?lr=zh-CN&q=" + escape("我的"), "get");
        return this.write(data,"utf8");
    }
}
