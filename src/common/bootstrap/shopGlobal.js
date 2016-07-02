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
