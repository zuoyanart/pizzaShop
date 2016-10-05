var addr = () => {
    let self = {};
    let $ = require("jquery");

    self.init = () => {
        changeArea("#province", "#city");
        changeArea("#city", "#county");
    }

    /***私有函数***/
    /**
     * 区域联动
     * @param  {[type]} obj       [description]
     * @param  {[type]} targetObj [description]
     * @return {[type]}           [description]
     */
    let changeArea = (obj, targetObj) => {
        $(obj).on("change", () => {
            $.ajax({
                type: "post",
                url: "/user/addr/getcity",
                data: "areaid=" + $(obj).find("option:selected").attr("data"),
                success: function(msg) {
                    let s = '<option value="" selected="selected">请选择</option>';
                    for (let i = 0; i < msg.result.length; i++) {
                        s += '<option value="' + msg.result[i].name + '" data="' + msg.result[i].area_id + '">' + msg.result[i].name + '</option>';
                    }
                    $(targetObj).html(s);
                }
            });
        });
    }

    return self;
}();

module.exports = addr;
