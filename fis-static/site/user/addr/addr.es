var addr = () => {
    let self = {};
    let $ = require("jquery");
    let tools = require("pizzatools");
    require("pizzaui");
    require("layer");

    self.init = (type = "get") => {
        if (type == "get") {
            changeArea("#province", "#city");
            changeArea("#city", "#district");
            validate();
            get();
        } else {
          $(".addrdel").on("click", function() {
            del($(this));
          });
          // setdef();
        }
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
        /**
         * 获取addr
         * @method
         * @return {[type]} [description]
         */
    let get = () => {
            let id = tools.getPara("id");
            if (id == "") {
                return;
            }
            $.ajax({
                type: "post",
                url: '/user/addr/get',
                data: "id=" + id,
                success: (msg) => {
                    let data = msg.msg;
                    for (let key in data) {
                        $("#" + key).val(data[key]);
                    }

                    $("#province").change();
                    setTimeout(function() {
                        $("#city").val(data.city);
                        $("#city").change();
                        setTimeout(function() {
                            $("#district").val(data.district);
                        }, 500);
                    }, 500);
                }
            });
        }
        /**
         * 表单验证
         * @method
         * @return {[type]} [description]
         */
    let validate = () => {
        $(".form").pizzaValidate({
            'fields': {
                '#province': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 20,
                    focusMsg: "请选择省份",
                    errMsg: '请选择省份'
                },
                '#city': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 20,
                    focusMsg: "请选择城市",
                    errMsg: '请选择城市'
                },
                '#district': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 20,
                    focusMsg: "请选择区域",
                    errMsg: '请选择区域'
                },
                '#address': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 200,
                    focusMsg: "请输入具体地址",
                    errMsg: '请输入具体地址'
                },
                '#zipcode': {
                    'must': true,
                    'minLength': 5,
                    'maxLength': 10,
                    focusMsg: "请输入邮编",
                    errMsg: '请输入邮编'
                },
                '#tel': {
                    'must': true,
                    'minLength': 6,
                    'maxLength': 20,
                    focusMsg: "请输入手机号码",
                    errMsg: '请输入手机号码'
                },
                '#consignee': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 20,
                    focusMsg: "请输入收货人",
                    errMsg: '请输入收货人'
                },
            },
            ajaxFun: function(data) {
                let id = tools.getPara("id");
                let op = "add";
                if (id != "") {
                    op = "edit";
                    data += "&address_id=" + id;
                }
                $.ajax({
                    type: "post",
                    url: "/user/addr/" + op,
                    data: data,
                    success: function(msg) {
                        if (msg.state == true) {
                            layer.msg("更新成功", function() {
                                document.location.href = "/user/addr";
                            });
                        }
                    }
                });
            }
        });
    }
    /**
     * 删除收货地址
     * @method
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    let del = (obj) => {
      console.log($(obj));
      let id = $(obj).parent().parent().attr("id");
      $.ajax({
        type:"post",
        url:"/user/addr/del",
        data:"id=" + id,
        success: (msg)=>{
           $("#" + id).remove();
        }
      });
    }

    return self;
}();

module.exports = addr;
