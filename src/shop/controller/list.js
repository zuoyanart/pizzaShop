'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
      let content = await this.fetch();
      console.log(content);
        return this.display();
    }
}
