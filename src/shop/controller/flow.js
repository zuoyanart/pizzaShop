'use strict';

import Base from './base.js';
import tools from '../../common/tools/tools.js';

export default class extends Base {//购物车相关
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {

        return this.display();
    }
}
