'use strict';

import fs from 'fs';
import superagent from 'superagent';
import crypto from 'crypto';
import xssFilter from 'xss';


export default class {
  /**
   * 读取文件
   * @method readFile
   * @param  {[type]} filePath 文件路径
   * @return {[Promise]}          [description]
   */
  static readFile(filePath) {
      return new Promise(function(resolve, reject) {
        fs.readFile(filePath, function(err, data) {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
    }
    /**
     * 写入文件
     * @method writeFile
     * @param  {[type]}  filePath [description]
     * @param  {[type]}  data     [description]
     * @return {[type]}           [description]
     */
  static writeFile(filePath, data) {
      return new Promise(function(resolve, reject) {
        fs.writeFile(filePath, data, function(err) {
          if (err) {
            reject(err);
          }
          resolve("true");
        });
      });
    }
    /**
     * http请求
     * @method httpAgent
     * @param  {[type]}  url    [description]
     * @param  {[type]}  method [description]
     * @param  {[type]}  data   [description]
     * @return {[type]}         [description]
     */
  static httpAgent(url, method, data) {
    data = data ? data : "";
    var method = method.toLowerCase();
    if (method == "get" || method == "del") {
      return new Promise(function(resolve, reject) {
        superagent[method].call(this, url).query(data).end(function(err, res) {
          if (err || !res.ok) {
            reject(err || res.ok);
          }
          resolve(res.body);
        });
      });
    } else {
      return new Promise(function(resolve, reject) {
        superagent[method].call(this, url).send(data).end(function(err, res) {
          if (err || !res.ok) {
            reject(err || res.ok);
          }
          resolve(res.body);
        });
      });
    }
  }

  /**
   * http请求
   * @method httpAgent
   * @param  {[type]}  url    [description]
   * @param  {[type]}  method [description]
   * @param  {[type]}  data   [description]
   * @return {[type]}         [description]
   */
static httpSpider(url, method, data) {
  data = data ? data : "";
  var method = method.toLowerCase();
  if (method == "get" || method == "del") {
    return new Promise(function(resolve, reject) {
      superagent[method].call(this, url).query(data).end(function(err, res) {
        if (err || !res.ok) {
          reject(err || res.ok);
        }
        resolve(res.text);
      });
    });
  } else {
    return new Promise(function(resolve, reject) {
      superagent[method].call(this, url).send(data).end(function(err, res) {
        if (err || !res.ok) {
          reject(err || res.ok);
        }
        resolve(res.text);
      });
    });
  }
}
/**
 * 格式化http参数
 * @method formatHttpParam
 * @return {[type]}        [description]
 */
static httpParam(param) {
  var s = '';
  for(var key in param) {
    s += key + "=" + param[key] + "&";
  }
  if(s != "") {
    s = s.substring(0, s.length - 1);
  }
  return s;
}
  /**
   * sha1加密
   * @param str 将加密的字符串
   * @returns {*}
   */
  static sha1(str) {
      return crypto.createHash('sha1').update(str).digest('hex');
    }
    /**
     * xss过滤
     * @method xssFomat
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
  static xss(str) {
    if (typeof(str) == "object") { //处理json
      let json = {};
      for (var key in str) {
        json[key] = xssFilter(str[key]);
      }
      return json;
    } else {
      return xssFilter(str);
    }
  }

  /**
   * 爬虫实体字符转义
   * @method htmlDecode
   * @param  {[type]}   str [description]
   * @return {[type]}       [description]
   */
  static htmlDecode(str) {
    // 一般可以先转换为标准 unicode 格式（有需要就添加：当返回的数据呈现太多\\\u 之类的时）
    str = unescape(str.replace(/\\u/g, "%u"));
    // 再对实体符进行转义
    // 有 x 则表示是16进制，$1 就是匹配是否有 x，$2 就是匹配出的第二个括号捕获到的内容，将 $2 以对应进制表示转换
    str = str.replace(/&#(x)?(\w+);/g, function($, $1, $2) {
      return String.fromCharCode(parseInt($2, $1 ? 16 : 10));
    });
    return str;
  }
  /**
   * 生成随机字符串
   * @method randomChar
   * @return {[type]}   [description]
   */
  static randomChar(len, charType) {
    let en = "0123456789qwertyioplkjhgfsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    let special = '~!@#$%^&*()_+{}[]:<>,.?';
    let x = en;
    if(charType) {
      x = en + special;
    }
    let tmp = "";
    for (var i = 0; i < len; i++) {
      tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
 }



}
