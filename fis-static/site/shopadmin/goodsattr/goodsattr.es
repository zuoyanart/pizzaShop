/**
 * 模块相关操作
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
let goodsattr = (function() {
    let $ = require('jquery');
    let tools = require('pizzatools');
    let common = require('common/common');
    let my = {};
    let options = {
        url: '/shopadmin/goodsattr/'
    };

    my.pageAll = function(goodsid) {
            page(goodsid);
        }
        /**
         * 获取模块列表
         * @method page
         * @return {[type]} [description]
         */
    function page(goodsid, callback) {
        $.ajax({
            url: options.url + 'page',
            data: "goodsid=" + goodsid,
            success: function(msg) {
              console.log(typeof(callback));
                if (typeof(callback) == "function") {
                  callback(msg);
                } else {
                    var data = msg.msg;
                    var len = data.length;
                    for(var i=0;i<len;i++) {
                      $("#catid_" + data[i].attrid + '_' +i).val(data[i].attrvalue);
                    }
                }
            }
        });
    }

    return my;
}());

module.exports = goodsattr;
