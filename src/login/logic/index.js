'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  async loginAction() {
     this.rules = {
      name: 'required|string|length:3,20',
      password: 'required|string|length:6,20',
    }
  }
}
