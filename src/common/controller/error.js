"use strict";
/**
 * error controller
 */
export default class extends think.controller.base {
  /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */
  displayErrorPage(status){
    let module = "common";
    if(think.mode !== think.mode_module){
      module = this.config("default_module");
    }
    let file = `${module}/error/${status}.html`;//es6字符串模板, display格式为：module/controller/action ===> module/controller_action.html
    let options = this.config("tpl");
    options = think.extend({}, options, {type: "ejs"});
    console.log(options);
    return this.display(file, options);
  }
  /**
   * Bad Request
   * @return {Promise} []
   */
  _400Action(){
    return this.displayErrorPage(400);
  }
  /**
   * Forbidden
   * @return {Promise} []
   */
  _403Action(){
    return this.displayErrorPage(403);
  }
  /**
   * Not Found
   * @return {Promise}      []
   */
  _404Action(){
    return this.displayErrorPage(404);
  }
  /**
   * Internal Server Error
   * @return {Promise}      []
   */
  _500Action(){
    return this.displayErrorPage(500);
  }
  /**
   * Service Unavailable
   * @return {Promise}      []
   */
  _503Action(){
    return this.displayErrorPage(503);
  }
}
