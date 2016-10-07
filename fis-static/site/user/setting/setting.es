var setting = () => {
    let self = {};
    let $ = require("jquery");
    require("pizzaui");
    require("layer");

    self.init = () => {
      get();
      edit();
    }
    /**
     * 获取基本信息
     * @return {[type]} [description]
     */
    let get = () => {
        $.ajax({
            type: "post",
            url: "/user/setting/get",
            success: (msg) => {
              let data = msg.msg;
              for(var key in data) {
                $("#" + key).val(data[key]);
              }
            }
        });
    }
    /**
     * 更新基本资料
     * @return {[type]} [description]
     */
    let edit = () => {
      $(".form").pizzaValidate({
          'fields': {
              '#mail': {
                  'must': true,
                  'minLength': 1,
                  'maxLength': 30,
                  'reg': "mail",
                  focusMsg: "请输入邮箱",
                  errMsg: '邮箱格式不合法'
              },
              '#phone': {
                  'must': true,
                  'minLength': 10,
                  'maxLength': 20,
                  'reg': "phone",
                  focusMsg: "请输入手机号码",
                  errMsg: '请输入手机号码'
              },
          },
          ajaxFun: function(data) {
              $.ajax({
                type:"post",
                  url: "/user/setting/edit",
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
}();

module.exports = setting;
