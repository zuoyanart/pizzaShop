/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */

/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *
 * }
 */

import fs from 'fs'; //fs
import superagent from 'superagent'; //爬虫
import crypto from 'crypto'; //加密
import xssFilter from 'xss'; //xss
import moment from 'moment'; //时间处理
/**
 * 读取文件
 * @method readFile
 * @param  {[type]} filePath 文件路径
 * @return {[Promise]}          [description]
 */
global.readFile = (filePath) => {
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
global.writeFile = (filePath, data) => {
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
global.httpAgent = (url, method = 'get', data = '') => {
        method = method.toLowerCase();
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
global.httpSpider = (url, method = 'get', data = '') => {
        method = method.toLowerCase();
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
     * 格式化http参数,组合成字符串的形式
     * @method formatHttpParam
     * @return {[type]}        [description]
     */
global.httpParam = (param) => {
        var s = '';
        for (var key in param) {
            s += key + "=" + param[key] + "&";
        }
        if (s != "") {
            s = s.substring(0, s.length - 1);
        }
        return s;
    }
    /**
     * sha1加密
     * @param str 将加密的字符串
     * @returns {*}
     */
global.sha1 = (str) => {
        return crypto.createHash('sha1').update(str).digest('hex');
    }
    /**
     * xss过滤
     * @method xssFomat
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
global.xss = (str) => {
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
global.htmlDecode = (str) => {
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
global.randomChar = (len, charType) => {
        let en = "0123456789qwertyioplkjhgfsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
        let special = '~!@#$%^&*()_+{}[]:<>,.?';
        let x = en;
        if (charType) {
            x = en + special;
        }
        let tmp = "";
        for (var i = 0; i < len; i++) {
            tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
        }
        return tmp;
    }
    /**
     * 获取unix时间
     * @method
     * @return {[type]} [description]
     */
global.getUnixTime = () => {
        return Math.round(new Date().getTime() / 1000);
    }
    /**
     * 获取字符串长度,却分中英文
     * @method
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
global.getCharLen = (str) => {
        return str.replace(/[^\x00-\xff]/g, "rr").length;
    }
    /**
     * 截取字符串， 区分中英文
     * @param s
     * @param l   长度
     * @param st   补充的结尾字符
     * @returns {*}
     */
global.subStr = (s, l, st = '') => {
        var T = false;
        if (getCharLen(s) > l) {
            l -= getCharLen(st);
            var S = escape(s);
            var M = S.length;
            var r = '';
            var C = 0;
            for (var i = 0; i < M; i++) {
                if (C < l) {
                    var t = S.charAt(i);
                    if (t == '%') {
                        t = S.charAt(i + 1);
                        if (t == 'u') {
                            r += S.substring(i, i + 6);
                            C += 2;
                            i += 5;
                        } else {
                            r += S.substring(i, i + 3);
                            C++;
                            i += 2;
                        }
                    } else {
                        r += t;
                        C++;
                    }
                } else {
                    T = true;
                    break;
                }
            }
        }
        return T ? unescape(r) + st : s;
    }
    /**
     * 时间格式化，传值为unix时间
     * @method function
     * @param  {[type]} format [description]
     * @return {[type]}        [description]
     */
global.formatTime = function(time = getUnixTime(), format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(time, "X").format(format);
};
