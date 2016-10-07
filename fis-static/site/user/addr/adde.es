var addr = (function () {
      var self = {};
      var $ = require("jquery");

      self.init = function () {
          changeArea("#province", "#city");
          changeArea("#city", "#county");
      };

      /***私有函数***/
      /**
       * 区域联动
       * @param  {[type]} obj       [description]
       * @param  {[type]} targetObj [description]
       * @return {[type]}           [description]
       */
      var changeArea = function changeArea(obj, targetObj) {
          $(obj).on("change", function () {
              $.ajax({
                  type: "post",
                  url: "/user/addr/getcity",
                  data: "areaid=" + $(obj).find("option:selected").attr("data"),
                  success: function success(msg) {
                      var s = '<option value="" selected="selected">请选择</option>';
                      for (var i = 0; i < msg.result.length; i++) {
                          s += '<option value="' + msg.result[i].name + '" data="' + msg.result[i].area_id + '">' + msg.result[i].name + '</option>';
                      }
                      $(targetObj).html(s);
                  }
              });
          });
      };

      let validate = ()=>{
        $(".form").pizzaValidate({
            'fields': {
                '#province': {
                    'must': true,
                    'minLength': 1,
                    'maxLength': 30,
                    focusMsg: "请选择省份",
                    errMsg: '请选择省份'
                },
                '#city': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 30,
                    focusMsg: "请选择城市",
                    errMsg: '请选择城市'
                },
                '#county': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 30,
                    focusMsg: "请选择区",
                    errMsg: '请选择区'
                },
                '#street': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 100,
                    focusMsg: "请填写街道",
                    errMsg: '请填写街道'
                },
                '#post': {
                    'must': true,
                    'minLength': 4,
                    'maxLength': 10,
                    focusMsg: "请输入邮编",
                    errMsg: '请输入能邮编'
                },
                '#phone': {
                    'must': true,
                    'minLength': 10,
                    'maxLength': 20,
                    'reg': "phone",
                    focusMsg: "请输入手机号码",
                    errMsg: '请输入手机号码'
                },
                '#username': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 20,
                    focusMsg: "请输入收货人",
                    errMsg: '请输入收货人'
                },
            },
            ajaxFun: function(data) {
                $.ajax({
                  type:"post",
                    url: "/user/addr/add",
                    data: data,
                    success: function(msg) {
                        if (msg.state == true) {
                           layer.msg("asdasd");
                        }
                    }
                });
            }
        });
      }

      return self;
  })();
  module.exports = addr;
