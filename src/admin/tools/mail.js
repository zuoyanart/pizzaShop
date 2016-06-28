'use strict';

import mail from 'nodemailer';
import config from '../config/config.js';

export default class {
  /**
   * 发送邮件
   * @method sendMail
   * @param  {[type]} to    接收邮箱
   * @param  {[type]} title 邮件标题
   * @param  {[type]} html  邮件内容
   * @return {[type]}       [description]
   */
  sendMail(to, title, html) {
    let transporter = mail.createTransport(config.mail.smtp);
    let mailOption = {
      from: 'huabinglan@163.com',
      to: to,
      subject: title,
      html: html
    }
    let fn = think.promisify(transporter.sendMail, transporter);
    return fn(mailOption);
  }
}
