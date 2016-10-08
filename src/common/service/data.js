'use strict';

export default class extends think.service.base {
    /**
     * 省份
     */
    static async getProvince() {
            let province =  await httpAgent("http://api.avatardata.cn/SimpleArea/LookUp?key=57a0631edb7c4929bc15215c9d6eb328&parentId=", "get");
            return province;
        }
        /**
         * 获取城市或者区
         * @method getCity
         * @param  {[type]} areaid [description]
         * @return {[type]}        [description]
         */
    static async getCity(areaid) {
        return await httpAgent("http://api.avatardata.cn/SimpleArea/LookUp?key=57a0631edb7c4929bc15215c9d6eb328&parentId=" + areaid, "get");
    }

}
