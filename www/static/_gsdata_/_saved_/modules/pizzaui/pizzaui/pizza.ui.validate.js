/**
 * --------------------------------------------------------
 * 表单验证插件
 * @Version 0.1
 * @Author: 左盐(huabinglan@163.com)
 * @Date: 14-1-5 下午2:38
 * --------------------------------------------------------
 */
;
(function($) {
  var tools = require('pizzatools');
  $.fn.pizzaValidate = function(options) {

    var defaults = {
      ajaxFunc: undefined //ajax提交函数
    }

    //默认正则
    var validReg = {
      mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, //邮箱
      china: /^[\u0391-\uFFE5]+$/, //中文
      int: /^\d+$/, //数字
      qq: /^[1-9]*[1-9][0-9]*$/, //QQ号码
      phone: /^[1]([3]|[4]|[5]|[8])[0-9]{9}$/, //手机号码
      user: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, //验证用户名，长度在5~16之间，只能包含字符、数字和下划线
      post: /[1-9]d{5}(?!d)/, //邮编
      url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^\"\"])*$/, //url地址
      idcard: /^\d{15}(\d{2}[A-Za-z0-9])?$/, //身份证号
      ip: /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //IP
    };

    var options = $.extend(defaults, options);

    var _dom = this,
      _fields = options.fields;


    //验证元素事件初始化
    function initValid() {
      var i = 0;
      for (var key in _fields) {
        var fieldValue = _fields[key],
          _domValid = $(key);
        if (fieldValue.focusMsg && fieldValue.errMsg) { //定义获取焦点时候的提示
          _domValid.data('validate', fieldValue);
          _domValid.focus(function() {
            if ($(this).attr('class') && $(this).attr('class').indexOf('validate-err') > -1) {
              $.fn.pizzaValidate.addTips($(this), 'errMsg');
            } else {
              $.fn.pizzaValidate.addTips($(this), 'focusMsg');
            }
          });
          _domValid.blur(function() {
            testValid($(this)); //执行校验
          });
        }
        i++;
      }
    }
    /** 进行校验
     *  @param:value 验证条件
     *  @obj 待校验的对象(jQuery)
     */
    function testValid(obj) {
      var value = obj.data('validate'),
        _must = (value.must == "true" || value.must == true),
        _isValid = true;
      var _value = $.trim(obj.val());
      if (_must || (!_must && _value !== '')) {
        //必须输入
        if (_value == '') {
            _isValid = false;
          $.fn.pizzaValidate.addTips(obj, 'errMsg');
          return;
        }
        if (value.comp) {
          if (_value !== $.trim($(value.comp).val())) {
            _isValid = false;
            $.fn.pizzaValidate.addTips(obj, 'compMsg');
            return;
          }
        }
        //大小的判断
        if (value.minLength || value.maxLength) {
          value.minLength = value.minLength == undefined ? 1 : value.minLength;
          value.maxLength = value.maxLength == undefined ? 100000 : value.maxLength;
          var _valueLen = _value.replace(/[^\x00-\xff]/g, "rr").length;
          if (!(_valueLen >= value.minLength && _valueLen <= value.maxLength)) {
            _isValid = false;
            $.fn.pizzaValidate.addTips(obj, 'errMsg');
            return;
          }
        }
        //正则的判断
        if (value.reg) {
          if (typeof(value.reg) == 'string') {
            if (!(validReg[value.reg].test(_value))) {
              _isValid = false;
              $.fn.pizzaValidate.addTips(obj, 'errMsg');
              return;
            }
          } else {
            if (!(value.reg.test(_value))) {
              _isValid = false;
              $.fn.pizzaValidate.addTips(obj, 'errMsg');
              return;
            }
          }
        }
        //ajax校验
        if (value.url) {
          obj.removeClass('pizzaajax').addClass('pizzaajax');
          $.ajax({
            type: "POST",
            url: value.url,
            data: obj.attr('name') + '=' + _value + tools.getCsrf(),
            dataType: 'json',
            success: function(msg) {
              if (msg.state != 'true') {
                $.fn.pizzaValidate.addTips(obj, 'errMsg');

              }
              if (_isValid) {
                $.fn.pizzaValidate.removeTips(obj);
              }
              obj.removeClass('pizzaajax');
            },
            error: function() {
              $.fn.pizzaValidate.addTips(obj, 'errMsg');
            }
          });
        }
      }
      //alert(JSON.stringify(value) + "_isValid=" + _isValid);
      if (_isValid) {
        $.fn.pizzaValidate.removeTips(obj);
      }
      return _isValid;
    }

    initValid();

    var submitDom = _dom.find(":submit");
    submitDom.bind('click', function() {
      return false;
    });
    submitDom.click(function() {
      var isValied = true,
        _postData = '';
      for (var key in _fields) {
        var fieldValue = _fields[key],
          _domValid = $(key);
        _postData += _domValid.attr('name') + '=' + _domValid.val() + '&'; //合并提交的参数
        if (fieldValue.focusMsg && fieldValue.errMsg) { //定义获取焦点时候的提示
          if (!testValid(_domValid)) { //执行校验
            isValied = false;
          }
        }
      }
      if (isValied) {
        var timeout = setInterval(function() {
          if (_dom.find('.pizzaajax').length === 0) {
            clearInterval(timeout);
            if (typeof(options.ajaxFun) == 'function') {
              options.ajaxFun(_postData);
            } else if (typeof(options.ajaxFun) == 'object') {
              $.ajax({
                type: 'POST',
                url: options.ajaxFun.url,
                data: _postData,
                success: options.ajaxFun.success,
                error: options.ajaxFun.error
              })
            } else {
              submitDom.unbind('click');
              submitDom.bind('click', function() {
                return true;
              });
              submitDom.click();
            }
          }
        }, 50);
      }
    });
  };
  /**
   * 添加提示的方法
   * @param obj 表单元素的jQuery对象
   * @param type 提示信息的名称
   */
  $.fn.pizzaValidate.addTips = function(obj, type) {
      var pizzalayer = require('pizzalayer');
      var objp = null;
      if (obj.attr('type') == 'hidden') {
        objp = obj.parent();
      } else {
        objp = obj;
      }
      //清除已有提示
      //$.fn.pizzaValidate.removeTips(objp);

      var skin = '';
      if (type == 'errMsg') {
        skin = 'layer-pizza-tip-danger';
        objp.addClass('validate-err');
      }
      pizzalayer.tips(objp, {
        msg: obj.data('validate')[type],
        skin: skin,
        time: 5000
      });
    //  alert("add");
    }
    /**
     * 移除提示的方法
     * @param obj 表单元素的jQuery对象
     */
  $.fn.pizzaValidate.removeTips = function(obj) {
  //  alert("remove");
    //清除已有提示
    var objp = null;
    if (obj.attr('type') == 'hidden') {
      objp = obj.parent();
    } else {
      objp = obj;
    }
    layer.closeAll('tips');
    objp.removeClass('validate-err');
  }

})(jQuery);
