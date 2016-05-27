/**
 * 整站翻页样式
 * @authors lingirl (success99@126.com)
 * @date    2015-09-08 16:06:29
 */

var $ = require('jquery');

var turnpage = function(options) {
	var _self = this;
	_self.isLink = false;
	_self.last = 0; //翻页算法中的last，非整数页的条数

	var defaults = {
		name: '', // 函数执行体，<函数名.方法>的形式
		sum: 0, // 总的数据条数
		pageTotal: 0, //总页数
		mp: 10, // 默认每页显示多少条
		docs: null //数据记录
	};

	options = $.extend(defaults, options);

	if (options.name.indexOf('/') > -1) {
		_self.isLink = true;
	}

	// 首页、上一页、下一页，翻页模式
	_self.hud = function(cp, mp) {
		var str = ''; // 用于拼接 html 字符串
		var clk = {
			// home 、up、down -- 分别对应首页、上一页、下一页的点击事件
			h: ' onclick="' + options.name + '(1);"',
			u: ' onclick="' + options.name + '(' + (cp - 1) + ');"',
			d: ' onclick="' + options.name + '(' + (cp + 1) + ');"'
		};

		var a = '<div class="clearfix turnpage turnpage-hud"><a class="btn btn-primary"',
			b = '>首页</a><a class="btn btn-primary"',
			c = '>上一页</a><a class="btn btn-primary"',
			d = '>下一页</a></div>';

		if (cp <= 1) {
			if (mp == options.mp) {
				str = a + b + c + clk.d + d;
			}
			if (mp < options.mp) {
				str = a + b + c + d;
			}
		}

		if (cp > 1) {
			if (mp == options.mp) {
				str = a + clk.h + b + clk.u + c + clk.d + d;
			}
			if (mp < options.mp) {
				str = a + clk.h + b + clk.u + c + d;
			}
		}

		return str;
	};

	// 标准翻页模式，包含首页、上下页、末页、及数字分页
	_self.hunde = function(cp) {
    console.log(options);
		var btnClass = 'btn btn-primary',
			gap = '<em>...</em>';
		var numberClass = 'number';

		if (cp == 1 && options.pageTotal == 0) { //当是第一页并且总页数未知时执行
			options.pageTotal = Math.ceil(options.sum / options.mp);
			var m = options.sum % options.mp;
			if (m != 0) {
				_self.last = m;
			}
		}

		if (options.pageTotal <= 1) {
			return '';
		}
		var str = '<div class="turnpage">';
		if (cp == 1) {
			str += '<a href="javascript:void(0);" class="' + btnClass + ' disabled">首页</a><a href="javascript:void(0);" class="' + btnClass + ' disabled">上页</a>';
		} else {
			str += '<a href="' + clickEvent(1, 0) + '" class="' + btnClass + '">首页</a><a href="' + clickEvent((cp - 1), cp) + '" class="' + btnClass + '">上页</a>';
		}
		var len = 0;
		if (cp < 6 || (cp < 9 && options.pageTotal < 9)) {
			if (options.pageTotal > 8) {
				len = 8;
			} else {
				len = options.pageTotal + 1;
			}
			for (var i = 1; i < len; i++) {
				if (i == cp) {
					str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
				} else {
					str += '<a href="' + clickEvent(i, cp) + '" class="' + numberClass + '">' + i + '</a>';
				}
			}
			if (options.pageTotal > 8) {
				str += gap + '<a href="' + clickEvent(options.pageTotal, 0) + '" class="' + numberClass + '">' + options.pageTotal + '</a>';
			}
		} else if (cp > 5 && (options.pageTotal - 5) >= cp && cp != options.pageTotal) {
			str += '<a href="' + clickEvent(1, 0) + '" class="' + numberClass + '">1</a>' + gap;
			var leng = cp - 2;
			for (var i = leng; i <= (cp + 2); i++) {
				if (i == cp) {
					str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
				} else {
					str += '<a href="' + clickEvent(i, cp) + '" class="' + numberClass + '">' + i + '</a>';
				}
			}
			str += gap + '<a href="' + clickEvent(options.pageTotal, 0) + '" class="' + numberClass + '">' + options.pageTotal + '</a>';
		} else {
			str += '<a href="' + clickEvent(1, 0) + '" class="' + numberClass + '">1</a>' + gap;
			for (var i = (options.pageTotal - 6); i <= options.pageTotal; i++) {
				if (i == cp) {
					str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
				} else {
					str += '<a href="' + clickEvent(i, cp) + '" class="' + numberClass + '">' + i + '</a>';
				}
			}
		}
		if (options.pageTotal == cp) {
			str += '<a href="javascript:void(0)" class="' + btnClass + ' disabled">下页</a><a class="' + btnClass + ' disabled" href="javascript:void(0);">末页</a>';
		} else {
			str += '<a href="' + clickEvent((cp + 1), cp) + '" class="' + btnClass + '">下一页</a><a href="' + clickEvent(options.pageTotal, 0) + '"  class="' + btnClass + '">末页</a>';
		}
		str += '</div>';
		return str;
	};
	/**
	 * 组装href属性
	 * @param  {[type]} page 改连接对应的cp
	 * @param  {[type]} oldpage 当前cp
	 * @return {[type]}      [description]
	 */
	function clickEvent(page, oldpage) {
		var s = '';
		if (_self.isLink) { //传值是一个连接
			s = options.name + '?cp=' + page;
		} else { //传值是一个函数
			s = 'javascript:' + options.name + '(' + page + ', ' + oldpage + ')';
		}
		return s;
	}
	/**
	 * 获取翻页算法中的参数
	 * @param  {[type]} page    [description]
	 * @param  {[type]} oldpage [description]
	 * @return {[type]}         [description]
	 */
	_self.getPageAjaxData = function(page, oldpage) {
			var pageAjaxData = 'last=0&step=0&v=1';
			var v = 1; //1向下翻，2向上翻
			var step = 1; //翻几页
			if (page == 1) {
				step = 0;
				v = 1;
			} else if (page == options.pageTotal) {
				step = 0;
				v = 2;
			} else {
				if (page < oldpage) {
					v = 2;
				}
				step = Math.abs(page - oldpage);
			}
			pageAjaxData = 'last=' + _self.last + '&step=' + step + '&v=' + v;
			var array = [];
			array.push(pageAjaxData);
			array.push(v);
			return array;
		}
		/**
		 * 获取参数id
		 * @param  {[type]} docs [description]
		 * @return {[type]}      [description]
		 */
	_self.getPageAjaxDataId = function(docs, v) {
		var id = 0;
		if (docs) {
			var length = docs.length;
			if (v == 2) {
				if (length > 0) {
					id = docs[0]._id; //给最后一个id赋值给内部全局遍历id
				}
			} else {
				if (length > 0) {
					id = docs[length - 1]._id; //给最后一个id赋值给内部全局遍历id
				}
			}
		} else {
			id = 0;
		}
		return id;
	}
};

module.exports = turnpage;
