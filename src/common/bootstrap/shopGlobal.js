//在线商城使用全局工具类
/**
 * 合并json对象，用第二个的默认值赋值给第一个不存在的key值
 * @method mergeJson,
 * @param  {[type]}    json1 [description]
 * @param  {[type]}    json2 [description]
 * @return {[type]}          [description]
 */
global.mergeJson = (json1, json2) => {
    let resultJson = {};
    for (let key in json2) {
        resultJson[key] = json2[key];
    }

    for (let key1 in json1) {
        resultJson[key1] = json1[key1];
    }
    return resultJson;
}

/**
 * 验证是否为智能手机
 * @ param {string} data :this.userAgent;
 * @ return {bool}
 */
/** global checkMobile */
global.checkMobile = function(agent) {
    let flag = false;
    agent = agent.toLowerCase();
    let keywords = ["android", "iphone", "ipod", "ipad", "windows phone", "mqqbrowser"];

    //排除 Windows 桌面系统
    if (!(agent.indexOf("windows nt") > -1) || (agent.indexOf("windows nt") > -1 && agent.indexOf("compatible; msie 9.0;") > -1)) {
        //排除苹果桌面系统
        if (!(agent.indexOf("windows nt") > -1) && !agent.indexOf("macintosh") > -1) {
            for (let item of keywords) {
                if (agent.indexOf(item) > -1) {
                    flag = true;
                    break;
                }
            }
        }
    }
    return flag;
}
