'use strict';

import Base from './base.js';
import sagent from 'superagent';
export default class extends Base {

  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
      //auto render template file index_index.html
      return this.display();
    }

}
