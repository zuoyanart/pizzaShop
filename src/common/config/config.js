'use strict';
/**
 * config
 */
export default {
  port: 8361,
  host: "",
  timeout: 60, //60s
  resource_on: true, //是否开启静态资源解析功能
  resource_reg: /^((static|upload)\/|[^\/]+\.(?!js|html|jpg|png|jpeg)\w+$)/, //判断为静态资源请求的正则
  log_error: true, //是否打印错误日志
  default_module: "home",
  default_controller: "index",
  default_action: "index",
  json_content_type: "application/json",
  openApi: false,
  api: 'http://192.168.1.134:4000/v1/',
  mail: { //邮箱配置
    smtp: {
      host: 'smtp.163.com',
      port: 465,
      secure: true,
      auth: {
        user: 'huabinglan@163.com',
        pass: ''
      }
    }
  },
  cloudImgUrl:{
    "shop": "http://o8tdqcp0r.bkt.clouddn.com"
  }
};
