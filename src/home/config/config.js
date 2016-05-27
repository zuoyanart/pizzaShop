'use strict';
/**
 * config
 */
export default {
  //key: value
  mail: {
    smtp: {
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: 'huabinglan@163.com',
        pass: 'spnt@#loveworld'
      }
    },
    to: ['490526801@qq.com','success99@126.com','2191921092@qq.com']
  },
  salt: "!rW3N3pJ*$#"//后台加密使用的盐
};
