/**
 *
 * @authors lingirl (success99@126.com)
 * @date    2015-08-10 14:10:31
 * @version $Id$
 */

var jQuery = require('jquery');
;(function($) {
    $.fn.wordsTip = function(options) {
        var oInput = this;//输入框对应的DOM
        var oTip = $('#' + oInput[0].id + '-tip'); //提示信息所在的DOM元素
        oInput.attr('validate', "false");
        var defaults = {
            min: 1, //最少字数
            max: 128, //最大字数
            English: true //是否区分中英文，默认区分
        };
		options = $.extend(defaults, options);

        //默认的提示
        var html = '字数：<span style="color:red;">' + options.min + ' - ' + options.max + '</span>' + ' 个字';
        oTip.html(html);

        oInput.on('keydown keyup blur focus', function(e) {
            //
            var val = $.trim(oInput.val());

            //输入字数的长度
            var input_length = getStrLength(val);

            //剩余或者超出的字数
            var num = options.max - input_length;

            if (num >= 0) {
                //输入过程中的提示
                html = '目前您还可以输入<span style="color:green;"> ' + num + ' </span>个字';
                oInput.attr('validate', "true");
                oTip.html(html);
            } else {
                //超出限定字数的提示
                html = '您已超出<span style="color:red;"> ' + -1 * num + ' </span>个字';
                oInput.attr('validate', "false");
                oTip.html(html);
            }

            if (e.type == 'blur' && !input_length) {
                oTip.html('字数：<span style="color:red;">' + options.min + '-' + options.max + ' </span>' + '个字');
            }

            //判断字符的长度
            function getStrLength(str) {
                //console.log(typeof options.English);
                if (options.English) {
                    return Math.ceil(str.replace(/[^\x00-\xff]/g, "rr").length / 2);
                } else {
                    return str.length;
                }
            }
            //
        });
    }
})(jQuery);
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
      if(!obj.data('validate')){
        console.log(obj);
        console.log("上面的元素不存在");
      }
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
                _isValid = false;
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
      _postData = _postData.substring(0, _postData.length -1);
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
/**
 *
 * @authors lingirl (success99@126.com)
 * @date    2015-08-11 14:10:31
 * @version $Id$
 */


;(function($) {
	$.fn.tip4detail = function() {
		//向页面添加弹出框
		if(!$('#tip-36526349')[0]) {
			$('body').append('<div style="position:absolute;"><div class="tip-36526349"><i></i></div></div>');
		}
		var _this = $(this);
		var obj = $('.tip-36526349');

		_this.hover(function() {
			var html = $(this).attr('data-explain') + '<i></i>';
			obj.empty().append(html).css({'display':'block'});

			var left = $(this).offset().left + 'px';
			var top = $(this).offset().top - parseInt(obj.css('height')) - 15 + 'px';
			//console.log(left + '===' + top);
			obj.parent().css({'top': top, 'left': left});
		}, function() {
			obj.css({'display':'none'});
		});
	}
})(jQuery);
/**
 * Author: lingirl (success99@126.com)
 * Date: 2015-08-26 10:23
 * Des : 使用localStorage实现本地化缓存
 */

(function(w, ls) {

	// window下挂载 store 属性
	w.store = {};

	// 不支持 localStorage 的话，返回 null
	if(!ls) {
		return null;
	}

	// 获取缓存
	store.get = function(key) {
		var s = ls.getItem(key);
		try {
			s = JSON.parse(s);
		} catch (e) {
			s = s !== undefined ? s : null;
		};
		return s;
	};

	// 设置缓存
	store.set = function(key, value) {
		//console.log(this.get(key));
		if(this.get(key) !== null) {
			this.remove(key);
		}
		if(typeof value == 'object') {
			ls.setItem(key, JSON.stringify(value));
		} else {
			ls.setItem(key, value);
		}
	};

	// 删除缓存
	store.remove = function(key) {
		ls.removeItem(key);
	};

	// 清除缓存
	store.clear = function() {
		ls.clear();
	};

	// 缓存数据的条数
	store.length = ls.length;

	//获取当前缓存数据的大小
	store.getSize = function() {
		var str = '';
		for(var j = 0; j < ls.length; j++) {
			str += ls[j];
		}
		str.replace(/[^\x00-\xff]/ig, 'aa');
		return Math.ceil(str.length / 1024) + 'K';
	};

})(window, window.localStorage);/**
 * --------------------------------------------------------
 * 下拉select模拟，使用方法参考demo
 * @Version 0.1
 * @Author: 左盐(huabinglan@163.com)
 * @Date: 15-8-3 下午4:58
 * --------------------------------------------------------
 */
;
(function($) {

  $.fn.pizzaSelect = function(options) {
    defaults = {
      showMaxHeight: null, //选择列表显示最大高度
      optionHeight: 24, //选择列表单项高度
      triangleSize: 6, //右侧小三角大小
      triangleColor: '#fff', //右侧小三角颜色
      topPosition: false, //选择列表项在列表框上部显示,默认在下边显示
      speed: 100, //选择列表框显示动画速度(毫秒)
      option: {}, //自定义数据，数据格式：text: value
      onChange: null //自定义模拟选择列表项change事件
    };

    var options = $.extend(defaults, options);
    var _dom = this;


    /**
     * 获取原生option数据并组合成div > ui > li
     * @param  {[type]} select  select 元素
     * @return {[type]}  []
     */
    function getSelectList(select) {
      var o = $(select);
      var oWidth = parseInt(o.width());
      var oHeight = parseInt(o.css("height"));


      var selectId = o.attr('id');
      var selectClass = o.attr('class');
      var selectedObj = o.find('option[selected="selected"]');

      var selected = '',
        selectedText = '';
      if (options.option.selected != undefined) {
        selected = options.option.selected.value;
        selectedText = options.option.selected.name;
      } else if (o.attr('val')) {
        selected = o.attr('val');
        selectedText = o.find('option[value="' + selected + '"]').text();
      } else if (selectedObj.length > 0) {
        selected = selectedObj.val();
        selectedText = selectedObj.text();
      } else {
        selected = o.find('option').first().attr('value');
        selectedText = o.find('option').first().text();
      }

      var div = '<div  id="' + selectId + 'p" class="btn-select" style="width:' + oWidth + 'px;height:' + oHeight + 'px" tabindex="0">';
      div += '<input type="hidden" value="' + selected + '" name="' + o.attr('name') + '" id="' + selectId + '"/>';
      div += '<i class="select-down icon-caret-down"></i>';
      div += '<label class="select-button"  style="height:' + (oHeight - 2) + 'px;line-height:' + (oHeight - 2) + 'px;">' + selectedText + '</label>';
      div += '<div class="select-list" >';
      div += '<ul>';
      if (!options.option.selected) {
        var value = '';
        o.find('option').each(function() {
          var o = $(this);
          value = o.attr('value') != undefined ? o.attr('value') : $.trim(o.text());
          div += '<li data="' + value + '" >' + $(this).text() + '</li>';
        });
      } else { //获取自定义数据
        for (var v in options.option) {
          if (v != 'selected') {
            div += '<li data="' + options.option[v] + '" >' + v + '</li>';
          };
        };
      };
      div += '</ul></div>';
      div += '</div>';

      o.after(div);
      disUllist(o);
      optionClick(o);
      listBlur(o);
      o.remove();
    }
    /**
     * 遍历选择器，初始化所有的select控件
     * @return {[type]} [description]
     */
    function eachSelect() {
      var div;
      $(_dom).each(function() {
        div = getSelectList($(this));
      });
    }
    /**
     * 显示或者隐藏下拉选项
     * @return {[type]} [description]
     */
    function disUllist(obj) {
      obj.next().find('.select-button').click(function() { //点击内容区弹出下拉
        $(this).next().toggle();
      });
      obj.next().find('.select-down').click(function() { //点击箭头弹出下拉
        $(this).next().next().toggle();
      });
    }
    /**
     * li点击事件
     * @return {[type]} [description]
     */
    function optionClick(obj) {
      obj.next().find('.select-list').on('click', 'li', function() {
        var parent = $(this).parent().parent().parent();
        if ($(this).attr('data') != parent.find('input[type="hidden"]').val()) {
          parent.find('.select-button').html($.trim($(this).html()));
          parent.find('input[type="hidden"]').val($(this).attr('data'));
          if ($.isFunction(options.onChange)) {
            options.onChange($(this), parent.find('input[type="hidden"]'));
          }
          if ($(this).attr('data') != '') { //清除表单验证提示
            parent.removeClass('validate-border');
          }
        }
        parent.find('.select-list').toggle();
      });
    }
    /**
     * 下拉消失控制
     * @return {[type]} [description]
     */
    function listBlur() {
      $("body").off('click.btn-select').on('click.btn-select', function(event) {
        var o = $(event.target);
        var select = o.parents('.btn-select');
        var selectId = select.attr('id');
        $('.select-list:visible').each(function() { //获取到所有的可见元素，然后遍历隐藏
          if ($(this).parents('.btn-select').attr('id') !== selectId) {
            $(this).css('display', 'none');
          }
        });
      });
    }
    //函数执行
    eachSelect();
  };

})(jQuery);
/*!
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

(function(global) {

  'use strict';

  //
  // Test for support. We do this as early as possible to optimise for browsers
  // that have native support for the attribute.
  //

  var test = document.createElement('input');
  var nativeSupport = test.placeholder !== void 0;

  global.Placeholders = {
    nativeSupport: nativeSupport,
    disable: nativeSupport ? noop : disablePlaceholders,
    enable: nativeSupport ? noop : enablePlaceholders
  };

  if (nativeSupport) {
    return;
  }

  //
  // If we reach this point then the browser does not have native support for
  // the attribute.
  //

  // The list of input element types that support the placeholder attribute.
  var validTypes = [
    'text',
    'search',
    'url',
    'tel',
    'email',
    'password',
    'number',
    'textarea'
  ];

  // The list of keycodes that are not allowed when the polyfill is configured
  // to hide-on-input.
  var badKeys = [

    // The following keys all cause the caret to jump to the end of the input
    // value.

    27, // Escape
    33, // Page up
    34, // Page down
    35, // End
    36, // Home

    // Arrow keys allow you to move the caret manually, which should be
    // prevented when the placeholder is visible.

    37, // Left
    38, // Up
    39, // Right
    40, // Down

    // The following keys allow you to modify the placeholder text by removing
    // characters, which should be prevented when the placeholder is visible.

    8, // Backspace
    46 // Delete
  ];

  // Styling variables.
  var placeholderStyleColor = '#ccc';
  var placeholderClassName = 'placeholder';
  var classNameRegExp = new RegExp('(?:^|\\s)' + placeholderClassName + '(?!\\S)');

  // The various data-* attributes used by the polyfill.
  var ATTR_CURRENT_VAL = 'data-placeholder-value';
  var ATTR_ACTIVE = 'data-placeholder-active';
  var ATTR_INPUT_TYPE = 'data-placeholder-type';
  var ATTR_FORM_HANDLED = 'data-placeholder-submit';
  var ATTR_EVENTS_BOUND = 'data-placeholder-bound';
  var ATTR_OPTION_FOCUS = 'data-placeholder-focus';
  var ATTR_OPTION_LIVE = 'data-placeholder-live';
  var ATTR_MAXLENGTH = 'data-placeholder-maxlength';

  // Various other variables used throughout the rest of the script.
  var UPDATE_INTERVAL = 100;
  var head = document.getElementsByTagName('head')[0];
  var root = document.documentElement;
  var Placeholders = global.Placeholders;
  var keydownVal;

  // Get references to all the input and textarea elements currently in the DOM
  // (live NodeList objects to we only need to do this once).
  var inputs = document.getElementsByTagName('input');
  var textareas = document.getElementsByTagName('textarea');

  // Get any settings declared as data-* attributes on the root element.
  // Currently the only options are whether to hide the placeholder on focus
  // or input and whether to auto-update.
  var hideOnInput = root.getAttribute(ATTR_OPTION_FOCUS) === 'false';
  var liveUpdates = root.getAttribute(ATTR_OPTION_LIVE) !== 'false';

  // Create style element for placeholder styles (instead of directly setting
  // style properties on elements - allows for better flexibility alongside
  // user-defined styles).
  var styleElem = document.createElement('style');
  styleElem.type = 'text/css';

  // Create style rules as text node.
  var styleRules = document.createTextNode(
    '.' + placeholderClassName + ' {' +
    'color:' + placeholderStyleColor + ';' +
    '}'
  );

  // Append style rules to newly created stylesheet.
  if (styleElem.styleSheet) {
    styleElem.styleSheet.cssText = styleRules.nodeValue;
  } else {
    styleElem.appendChild(styleRules);
  }

  // Prepend new style element to the head (before any existing stylesheets,
  // so user-defined rules take precedence).
  head.insertBefore(styleElem, head.firstChild);

  // Set up the placeholders.
  var placeholder;
  var elem;

  for (var i = 0, len = inputs.length + textareas.length; i < len; i++) {

    // Find the next element. If we've already done all the inputs we move on
    // to the textareas.
    elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

    // Get the value of the placeholder attribute, if any. IE10 emulating IE7
    // fails with getAttribute, hence the use of the attributes node.
    placeholder = elem.attributes.placeholder;

    // If the element has a placeholder attribute we need to modify it.
    if (placeholder) {

      // IE returns an empty object instead of undefined if the attribute is
      // not present.
      placeholder = placeholder.nodeValue;

      // Only apply the polyfill if this element is of a type that supports
      // placeholders and has a placeholder attribute with a non-empty value.
      if (placeholder && inArray(validTypes, elem.type)) {
        newElement(elem);
      }
    }
  }

  // If enabled, the polyfill will repeatedly check for changed/added elements
  // and apply to those as well.
  var timer = setInterval(function() {
    for (var i = 0, len = inputs.length + textareas.length; i < len; i++) {
      elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

      // Only apply the polyfill if this element is of a type that supports
      // placeholders, and has a placeholder attribute with a non-empty value.
      placeholder = elem.attributes.placeholder;

      if (placeholder) {

        placeholder = placeholder.nodeValue;

        if (placeholder && inArray(validTypes, elem.type)) {

          // If the element hasn't had event handlers bound to it then add
          // them.
          if (!elem.getAttribute(ATTR_EVENTS_BOUND)) {
            newElement(elem);
          }

          // If the placeholder value has changed or not been initialised yet
          // we need to update the display.
          if (
            placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) ||
            (elem.type === 'password' && !elem.getAttribute(ATTR_INPUT_TYPE))
          ) {

            // Attempt to change the type of password inputs (fails in IE < 9).
            if (
              elem.type === 'password' &&
              !elem.getAttribute(ATTR_INPUT_TYPE) &&
              changeType(elem, 'text')
            ) {
              elem.setAttribute(ATTR_INPUT_TYPE, 'password');
            }

            // If the placeholder value has changed and the placeholder is
            // currently on display we need to change it.
            if (elem.value === elem.getAttribute(ATTR_CURRENT_VAL)) {
              elem.value = placeholder;
            }

            // Keep a reference to the current placeholder value in case it
            // changes via another script.
            elem.setAttribute(ATTR_CURRENT_VAL, placeholder);
          }
        }
      } else if (elem.getAttribute(ATTR_ACTIVE)) {
        hidePlaceholder(elem);
        elem.removeAttribute(ATTR_CURRENT_VAL);
      }
    }

    // If live updates are not enabled cancel the timer.
    if (!liveUpdates) {
      clearInterval(timer);
    }
  }, UPDATE_INTERVAL);

  // Disabling placeholders before unloading the page prevents flash of
  // unstyled placeholders on load if the page was refreshed.
  addEventListener(global, 'beforeunload', function() {
    Placeholders.disable();
  });

  //
  // Utility functions
  //

  // No-op (used in place of public methods when native support is detected).
  function noop() {}

  // Avoid IE9 activeElement of death when an iframe is used.
  //
  // More info:
  //  - http://bugs.jquery.com/ticket/13393
  //  - https://github.com/jquery/jquery/commit/85fc5878b3c6af73f42d61eedf73013e7faae408
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {}
  }

  // Check whether an item is in an array. We don't use Array.prototype.indexOf
  // so we don't clobber any existing polyfills. This is a really simple
  // alternative.
  function inArray(arr, item) {
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === item) {
        return true;
      }
    }
    return false;
  }

  // Cross-browser DOM event binding
  function addEventListener(elem, event, fn) {
    if (elem.addEventListener) {
      return elem.addEventListener(event, fn, false);
    }
    if (elem.attachEvent) {
      return elem.attachEvent('on' + event, fn);
    }
  }

  // Move the caret to the index position specified. Assumes that the element
  // has focus.
  function moveCaret(elem, index) {
    var range;
    if (elem.createTextRange) {
      range = elem.createTextRange();
      range.move('character', index);
      range.select();
    } else if (elem.selectionStart) {
      elem.focus();
      elem.setSelectionRange(index, index);
    }
  }

  // Attempt to change the type property of an input element.
  function changeType(elem, type) {
    try {
      elem.type = type;
      return true;
    } catch (e) {
      // You can't change input type in IE8 and below.
      return false;
    }
  }

  function handleElem(node, callback) {

    // Check if the passed in node is an input/textarea (in which case it can't
    // have any affected descendants).
    if (node && node.getAttribute(ATTR_CURRENT_VAL)) {
      callback(node);
    } else {

      // If an element was passed in, get all affected descendants. Otherwise,
      // get all affected elements in document.
      var handleInputs = node ? node.getElementsByTagName('input') : inputs;
      var handleTextareas = node ? node.getElementsByTagName('textarea') : textareas;

      var handleInputsLength = handleInputs ? handleInputs.length : 0;
      var handleTextareasLength = handleTextareas ? handleTextareas.length : 0;

      // Run the callback for each element.
      var len = handleInputsLength + handleTextareasLength;
      var elem;
      for (var i = 0; i < len; i++) {

        elem = i < handleInputsLength ?
          handleInputs[i] :
          handleTextareas[i - handleInputsLength];

        callback(elem);
      }
    }
  }

  // Return all affected elements to their normal state (remove placeholder
  // value if present).
  function disablePlaceholders(node) {
    handleElem(node, hidePlaceholder);
  }

  // Show the placeholder value on all appropriate elements.
  function enablePlaceholders(node) {
    handleElem(node, showPlaceholder);
  }

  // Hide the placeholder value on a single element. Returns true if the
  // placeholder was hidden and false if it was not (because it wasn't visible
  // in the first place).
  function hidePlaceholder(elem, keydownValue) {

    var valueChanged = !!keydownValue && elem.value !== keydownValue;
    var isPlaceholderValue = elem.value === elem.getAttribute(ATTR_CURRENT_VAL);

    if (
      (valueChanged || isPlaceholderValue) &&
      elem.getAttribute(ATTR_ACTIVE) === 'true'
    ) {

      elem.removeAttribute(ATTR_ACTIVE);
      elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), '');
      elem.className = elem.className.replace(classNameRegExp, '');

      // Restore the maxlength value. Old FF returns -1 if attribute not set.
      // See GH-56.
      var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
      if (parseInt(maxLength, 10) >= 0) {
        elem.setAttribute('maxLength', maxLength);
        elem.removeAttribute(ATTR_MAXLENGTH);
      }

      // If the polyfill has changed the type of the element we need to change
      // it back.
      var type = elem.getAttribute(ATTR_INPUT_TYPE);
      if (type) {
        elem.type = type;
      }

      return true;
    }

    return false;
  }

  // Show the placeholder value on a single element. Returns true if the
  // placeholder was shown and false if it was not (because it was already
  // visible).
  function showPlaceholder(elem) {

    var val = elem.getAttribute(ATTR_CURRENT_VAL);

    if (elem.value === '' && val) {

      elem.setAttribute(ATTR_ACTIVE, 'true');
      elem.value = val;
      elem.className += ' ' + placeholderClassName;

      // Store and remove the maxlength value.
      var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
      if (!maxLength) {
        elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength);
        elem.removeAttribute('maxLength');
      }

      // If the type of element needs to change, change it (e.g. password
      // inputs).
      var type = elem.getAttribute(ATTR_INPUT_TYPE);
      if (type) {
        elem.type = 'text';
      } else if (elem.type === 'password' && changeType(elem, 'text')) {
        elem.setAttribute(ATTR_INPUT_TYPE, 'password');
      }

      return true;
    }

    return false;
  }

  // Returns a function that is used as a focus event handler.
  function makeFocusHandler(elem) {
    return function() {

      // Only hide the placeholder value if the (default) hide-on-focus
      // behaviour is enabled.
      if (
        hideOnInput &&
        elem.value === elem.getAttribute(ATTR_CURRENT_VAL) &&
        elem.getAttribute(ATTR_ACTIVE) === 'true'
      ) {

        // Move the caret to the start of the input (this mimics the behaviour
        // of all browsers that do not hide the placeholder on focus).
        moveCaret(elem, 0);
      } else {

        // Remove the placeholder.
        hidePlaceholder(elem);
      }
    };
  }

  // Returns a function that is used as a blur event handler.
  function makeBlurHandler(elem) {
    return function() {
      showPlaceholder(elem);
    };
  }

  // Returns a function that is used as a submit event handler on form elements
  // that have children affected by this polyfill.
  function makeSubmitHandler(form) {
    return function() {

      // Turn off placeholders on all appropriate descendant elements.
      disablePlaceholders(form);
    };
  }

  // Functions that are used as a event handlers when the hide-on-input
  // behaviour has been activated - very basic implementation of the 'input'
  // event.
  function makeKeydownHandler(elem) {
    return function(e) {
      keydownVal = elem.value;

      // Prevent the use of the arrow keys (try to keep the cursor before the
      // placeholder).
      if (
        elem.getAttribute(ATTR_ACTIVE) === 'true' &&
        keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) &&
        inArray(badKeys, e.keyCode)
      ) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      }
    };
  }

  function makeKeyupHandler(elem) {
    return function() {
      hidePlaceholder(elem, keydownVal);

      // If the element is now empty we need to show the placeholder
      if (elem.value === '') {
        elem.blur();
        moveCaret(elem, 0);
      }
    };
  }

  function makeClickHandler(elem) {
    return function() {
      if (
        elem === safeActiveElement() &&
        elem.value === elem.getAttribute(ATTR_CURRENT_VAL) &&
        elem.getAttribute(ATTR_ACTIVE) === 'true'
      ) {
        moveCaret(elem, 0);
      }
    };
  }

  // Bind event handlers to an element that we need to affect with the
  // polyfill.
  function newElement(elem) {

    // If the element is part of a form, make sure the placeholder string is
    // not submitted as a value.
    var form = elem.form;
    if (form && typeof form === 'string') {

      // Get the real form.
      form = document.getElementById(form);

      // Set a flag on the form so we know it's been handled (forms can contain
      // multiple inputs).
      if (!form.getAttribute(ATTR_FORM_HANDLED)) {
        addEventListener(form, 'submit', makeSubmitHandler(form));
        form.setAttribute(ATTR_FORM_HANDLED, 'true');
      }
    }

    // Bind event handlers to the element so we can hide/show the placeholder
    // as appropriate.
    addEventListener(elem, 'focus', makeFocusHandler(elem));
    addEventListener(elem, 'blur', makeBlurHandler(elem));

    // If the placeholder should hide on input rather than on focus we need
    // additional event handlers
    if (hideOnInput) {
      addEventListener(elem, 'keydown', makeKeydownHandler(elem));
      addEventListener(elem, 'keyup', makeKeyupHandler(elem));
      addEventListener(elem, 'click', makeClickHandler(elem));
    }

    // Remember that we've bound event handlers to this element.
    elem.setAttribute(ATTR_EVENTS_BOUND, 'true');
    elem.setAttribute(ATTR_CURRENT_VAL, placeholder);

    // If the element doesn't have a value and is not focussed, set it to the
    // placeholder string.
    if (hideOnInput || elem !== safeActiveElement()) {
      showPlaceholder(elem);
    }
  }

}(this));
/**
 * 显示会员信息
 * @param  {[type]} function($ [description]
 * @return {[type]}            [description]
 */
;
(function($) {
	$.fn.memberInfo = function(options) {
		if (!$('.member-143000181')[0]) {
			$('body').append('<div style="position:absolute;"><div class="member-143000181"></div></div>');
		}
		var tpl = __inline('memberInfo.ejs');
		var
		oAvatar = $(this), //触发事件的DOM对象
		obj = $('.member-143000181'), //信息卡片所在的DOM
		arrow, //卡片箭头的方向
		left, right, top, //定位用到的 left 与 top
		cache, //缓存获取到的会员信息
		str; //内部使用的字符串

		var defaults = {
			url: '/user/user/getdoc', //数据请求地址
			on: '' //继承绑定
		};

		options = $.extend(defaults, options);

		/**
		 * 显示会员信息窗口
		 * @return {Boolean} [description]
		 */
		function disMemberInfo(thisObj) {
			var _parent = $('.member-143000181').parent();
			//用于判断信息卡片是在上方还是在下方显示
			var scrollTop = $(document).scrollTop();
			var flag = Math.floor(thisObj.offset().top);
			left = Math.floor(thisObj.offset().left);
			cache = thisObj.data('dbMember');

			right = $(window).width() - left;

			if(right <= 300) {
				if (flag - scrollTop > 150) {
					top = flag - 120 + 'px';
					arrow = '<i class="arrow-5678"></i>';
				} else {
					top = flag + parseInt(thisObj.css('height')) + 15 + 'px';
					arrow = '<i class="arrow-8765"></i>';
				}
				left -= 220;
			} else {
				if (flag - scrollTop > 150) {
					top = flag - 120 + 'px';
					arrow = '<i class="arrow-1234"></i>';
				} else {
					top = flag + parseInt(thisObj.css('height')) + 15 + 'px';
					arrow = '<i class="arrow-4321"></i>';
				}
			}
			right += 'px'; left += 'px';

			// ajax 数据
			var data = 'id=' + thisObj.attr('id') + '&nid=' + thisObj.attr('nid');

			if (cache) {
				var inf = thisObj.data('dbMember');
				var str = arrow + tpl({data:inf});
				obj.empty().append(str).css({
					'display': 'block'
				});
				_parent.css({
					'left': left,
					'top': top
				});
			} else if(thisObj.attr('dbMemberError') == 'true'){//如果有错误，则停止请求
				return;
			} else {
				$.ajax({
					url: options.url,
					data: data + tools.getCsrf(),
					success: function(msg) {
						thisObj.data('dbMember', msg.data);
						var str = arrow + tpl(msg);
						obj.empty().append(str).css({
							'display': 'block'
						});
						_parent.css({
							'left': left,
							'top': top
						});
						thisObj.attr('dbMemberError','false');
					},
					error: function(msg) {
						thisObj.attr('dbMemberError','true');
					}
				});
			}
		}

		/**
		 * 隐藏会员信息窗口
		 * @return {[type]} [description]
		 */
		function hideMemberInfo() {
			obj.css({
				'display': 'none'
			});
		}

		var timeout = 0;
		oAvatar.on('mouseenter', options.on, function() {
			var _this = $(this);
			function mid(obj) {
				return function() {
					disMemberInfo(obj);
				}
			}
			timeout = setTimeout(mid(_this), 300);
		}).on('mouseleave', options.on, function() {
			clearInterval(timeout);
			hideMemberInfo();
		});
	}
})(jQuery);
/**
 * @authors lingirl (success99@126.com)
 * @date    2015-07-23 10:10:31
 * @description  城市选择
 * @version $Id$
 */

var tools = require('pizzatools');

;(function($) {
	$.fn.pizzaArea = function(options) {
		var oUl, oInput = $(this),

		//保存选择的省份
		province,

		//城市选择是否满足规则
		isRight = [0, 0],

		//本地化存储，减少请求
		local_area/* = store.get('local_area') || {}*/,

		//内部随机数,匹配使用
		random = Math.ceil(Math.random()*(1e+10));

		var defaults = {
			//默认false, 城市中不包含"不限"
			//true -- 城市中包含"不限"
			ajaxUrl: "/area/index",
			type: true,
			onChange: null
		};

		var csrf = "";
		if(document.location.href.indexOf("/pop/") === -1) {
			csrf = tools.getCsrf();
		} else {
			csrf =  tools.getCsrf({isparent:true});
		}


		options = $.extend( defaults, options );

		//初始化函数
		function init() {
			//getData();
			getFocus();
			getClick();
			getBlur();
		}

		/**
		 * 将 input 扩展为下面的形式
		 *
		 * <div>
		 *     <input>
		 *     <ul></ul>
		 * </div>
		 *
		 */
		function getWrap() {
			oInput.wrap('<div class="area-wrap-1234"></div>').after('<ul class="area-list" area="' + random + '"></ul>').attr('area', random);
			oUl = oInput.siblings('ul');
			init();
		}

		/**
		 * 手动输入城市
		 * 获取城市相关数据
		 * data: string
		 */
		function getData(data) {
			$.ajax({
				url : options.ajaxUrl,
				data: 'data=' + csrf,
				success : function(msg) {
					var list = '';
					if($.isEmptyObject(msg)) {
						oUl.empty().append('<span style="line-height: 3em;">未找到这个城市！</span>')
					} else {
						for(var i in msg) {
							list += '<li area="' + i + '">' + msg[i] + '</li>';
						}
						oUl.empty().append(list).children('li').css({'width':'100%'});
						display(1);
					}
				}
			});
		}
		/**
		 * 本地化存储,数据格式为
		 *
		 * {
		 *     name: '河南',
		 *     sub : {
		 *     		0: 郑州,
		 *     		1: 新乡,
		 *     		...
		 *     }
		 * }
		 *
		 */
		function localStorage(data) {
			for(var k in data) {
				var arr = k.split('-');
				if(arr[1]) {
					local_area[arr[0]]['sub'][k] = data[k];
				} else {
					local_area[k] = {};
					local_area[k]['name'] = data[k];
					local_area[k]['sub'] = {};
				}
			}
			store.set('local_area', local_area);
		};
		/**
		 * 向城市列表所在的DOM添加城市数据
		 * mark为-1时,添加省份
		 * mark >= 0时,添加城市
		 */
		function appendData(mark) {
			var data = store.get('local_area');
			var list = '';

			if(options.type) {
				list += '<li area="unlimited">不限</li>';
			}

			if(mark == -1) {
				for(var i in data) {
					list += '<li area="' + i + '">' + data[i]['name'] + '</li>';
				}
			} else {
				var empty = $.isEmptyObject(data[mark]['sub']);
				//本地未查询到数据时,向服务器请求
				if(empty) {
					$.ajax({
						url : options.ajaxUrl,
						data: 'data=' + mark + csrf,
						success : function(msg) {
							localStorage(msg);
							appendData(mark);
						}
					});
				} else {
					var temp = data[mark]['sub']
					for(var j in temp) {
						list += '<li area="' + j + '">' + temp[j] + '</li>';
					}
				}
			}

			oUl.empty().append(list);
		};
		//城市列表所在DOM元素的显示与隐藏
		function display(dis) {
			if(dis) {
				//oUl.css({'display':'block'});
				oUl.fadeIn(200);
			} else {
				//oUl.css({'display':'none'});
				oUl.fadeOut(200);
			}
		};
		/**
		 * input 元素获得焦点
		 * 及键盘事件的绑定
		 */
		function getFocus() {
			var lastValue = ' ';
			oInput.on('keyup focus', function(e) {

				var inputValue = $.trim($(this).val());
				var flag = inputValue.indexOf('-') == -1;
				var unequal = inputValue != lastValue;
				//
				//如果输入框包含'-'及非汉字
				//则不进行搜索
				if(flag) {
					var chineseReg = /[^\u4E00-\u9FA5]/g;
					if(chineseReg.exec(inputValue)) {
						return;
					}
				}

				if(e.type == 'focus') {

					$('.area-list').css({'display':'none'});
					local_area = store.get('local_area');

					if(!local_area) {
						local_area = {};
						$.ajax({
							url : options.ajaxUrl,
							data: 'data=9999' + csrf,
							success : function(msg) {
								localStorage(msg);
								appendData(-1);
								display(1);
							}
						});
					} else {
						appendData(-1);
						display(1);
					}
				}

				if(e.type == 'keyup') {
					//
					if(e.keyCode == 37 || e.keyCode == 39 || inputValue.indexOf('不') > -1) {
						return;
					}
					//
					if(unequal) {
						isRight = [0, 0];
					}
					//
					if(!inputValue.length && e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {
						appendData(-1);
						display(1);
					}
					//
					if(inputValue.length && flag && unequal && e.keyCode != 38 && e.keyCode != 40) {
						//服务器搜索
						getData(inputValue);
					}
				}
				//
				lastValue = inputValue;
				keyboard(e.keyCode);
			});
		};

		/* 地区数据发生变化的时候ajax提交一下
		 */
		function isChange() {
			if(options.onChange !== null) {
				options.onChange();
			}
		}

		/**
		 * 省份和城市被点击后执行的事件
		 */
		function getClick() {
			//
			oUl.on('click', 'li', function() {
				var oLi = $(this);
				var str = oLi.attr('area');
				var text = oLi.text();
				//--`不限`被点击
				if(str == 'unlimited') {
					if(province) {
						oInput.val(province);
					} else {
						oInput.val(text);
					}
					display(0);
					province = null;
					isRight = [1, 1];
					isChange();
					return;
				}
				//--`河南-郑州`这种形式被点击
				/*var reg = /^c\d{10}/;
				if(reg.exec(str)) {
					oInput.val(text);
					display(0);
					isRight = [1, 1];
					return;
				}*/

				if(str.indexOf('c') == 0) {
					oInput.val(text);
					display(0);
					isRight = [1, 1];
					isChange();
					return;
				}

				//省份被点击
				if(str.indexOf('-') == -1) {
					appendData(str);
					province = text;
					oInput.val(text);
					isRight = [1, 0];
				} else {
					//省份下的城市被点击
					oInput.val(province + '-' + text);
					display(0);
					province = null;
					isRight = [1, 1];
					isChange();
				}
			});
		};
		/**
		 * 键盘事件 上下键和回车键
		 * keycode 为键盘的编码
		 */
		function keyboard(keycode) {
			var cls = 'choice';
			var checked = oUl.children('.' + cls);
			var idx = checked.index();

			var obj_li = oUl.children('li');
			var li_len = obj_li.length;

			if(keycode == 40) {// DOWN
				if(idx == -1) {
					obj_li.eq(0).addClass(cls);
				} else if(idx == li_len - 1) {
					checked.removeClass(cls);
					obj_li.eq(0).addClass(cls);
				} else {
					checked.removeClass(cls).next().addClass(cls);
				}
				//
			} else if(keycode == 38) { // UP
				if(idx == -1) {
					obj_li.eq(-1).addClass(cls);
				} else if(idx == 0) {
					checked.removeClass(cls);
					obj_li.eq(-1).addClass(cls);
				} else {
					checked.removeClass(cls).prev().addClass(cls);
				}
			} else if(keycode == 13) { // ENTER
				checked.click();
			}
		};

		function getBlur() {
			oInput.on('blur', function() {
				none();
			});
		}
		//不在列表区域点击
		//列表消失
		function none() {
			var eventSpace = 'click.chengshixuanze';
			$("body").off(eventSpace).on(eventSpace, function(event){
				var defvalue = $('#area').attr('defvalue');
			    if($(event.target).attr('area')) {
			    	var target = event.target.nodeName.toLowerCase();
			    	if(target == 'input' && isRight[0] + isRight[1] != 2) {
			    		if(defvalue) {
			    			oInput.val(defvalue);
			    		} else {
			    			oInput.val('');
			    		}
			    	}
			    	return;
			    }
			   	$('.area-list').css('display','none');
			   	if(isRight[0] + isRight[1] != 2) {
			   		if(defvalue) {
		    			oInput.val(defvalue);
		    		} else {
		    			oInput.val('');
		    		}
			   	}
		    });
		};
		//
		getWrap();
	}
})(jQuery);
/**
 * TAB UI的实现，使用方法参考demo
 * @Version 0.2
 * @Author: 左盐(huabinglan@163.com)
 * @Date: 14-1-2 下午6:05
 */
;
(function($) {

  $.fn.pizzaTab = function(options) {

    var defaults = {
      activeCla: "active", //默认标题选中样式
      itemCla: 'item', //默认正文区样式
      url: undefined
    }

    var options = $.extend(defaults, options);
    //私有函数，ajax执行函数
    function _ajaxData(li, divCon) {
      if (divCon.attr("isajax") !== 'ajax') {
        $.ajax({ //请求数据
          type: "POST",
          url: options.url,
          data: li.attr('param'),
          success: function(msg) {
            divCon.html(msg.msg);
            divCon.attr("isajax", "ajax");
          }
        });
      }
    }

    //事件绑定
    var ul = this.find('ul:first');
    ul.on("click", 'li', function() {
      var li = $(this),index = li.index();

      if (!li.hasClass(options.activeClass)) {
          var activeli = li.parent().find("." + options.activeCla);
          var activeliIndex = activeli.index();
          activeli.removeClass(options.activeCla);
          li.addClass(options.activeCla);
          var divs = li.parent().parent().children("." + options.itemCla);
          $(divs[activeliIndex]).removeAttr("style");
          $(divs[index]).css("display", "block");
          if (options.url) {
            _ajaxData(li, $(divs[index]));
          }
        }
    });

    //当需要ajax请求并且第一项为空时，默认加载执行ajax加载第一项的内容
    if (options.url) {
      var firstLi = this.find('ul:first').find('.' + options.activeCla),
        firstDiv = $("." + options.itemCla).first().css("display", "block");
      _ajaxData(firstLi, firstDiv);
    } else {
      $(this).children("." + options.itemCla).first().css("display", "block");
    }
  };

})(jQuery);
