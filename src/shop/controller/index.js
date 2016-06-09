'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let goods = this.model("/shopadmin/goods");

        return this.display();
    }
}
