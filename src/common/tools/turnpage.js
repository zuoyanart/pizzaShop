/**
 * 整站翻页样式
 * @authors lingirl (success99@126.com)
 * @date    2015-09-08 16:06:29
 */
var turnpage = function(options) {
    var _self = this;
    _self.options = options;
    _self.isLink = false;

    var defaults = {
        name: '', // 函数执行体，<函数名.方法>的形式
        sum: 0, // 总的数据条数
        pageTotal: 0, //总页数
        mp: 10 // 默认每页显示多少条
    };

//options =tools.mergeJson([defaults, options]);//(defaults, options);

    if (_self.options.name.indexOf('/') > -1) {
        _self.isLink = true;
    }

    // 首页、上一页、下一页，翻页模式
    _self.hud = function(cp, mp) {
        var str = ''; // 用于拼接 html 字符串
        var clk = {
            // home 、up、down -- 分别对应首页、上一页、下一页的点击事件
            h: ' onclick="' + _self.options.name + '(1);"',
            u: ' onclick="' + _self.options.name + '(' + (cp - 1) + ');"',
            d: ' onclick="' + _self.options.name + '(' + (cp + 1) + ');"'
        };

        var a = '<div class="clearfix turnpage turnpage-hud"><a class="btn btn-primary"',
            b = '>首页</a><a class="btn btn-primary"',
            c = '>上一页</a><a class="btn btn-primary"',
            d = '>下一页</a></div>';

        if (cp <= 1) {
            if (mp == _self.options.mp) {
                str = a + b + c + clk.d + d;
            }
            if (mp < _self.options.mp) {
                str = a + b + c + d;
            }
        }

        if (cp > 1) {
            if (mp == _self.options.mp) {
                str = a + clk.h + b + clk.u + c + clk.d + d;
            }
            if (mp < _self.options.mp) {
                str = a + clk.h + b + clk.u + c + d;
            }
        }

        return str;
    };

    // 标准翻页模式，包含首页、上下页、末页、及数字分页
    _self.hunde = function(cp) {
        var btnClass = 'btn btn-primary',
            gap = '<em>...</em>';
        var numberClass = 'number';

        _self.options.pageTotal = Math.ceil(_self.options.sum / _self.options.mp);

        if(_self.options.pageTotal <= 1) {
            return '';
        }
        var str = '<div class="turnpage">';
        if (cp == 1) {
            str += '<a href="javascript:void(0);" class="' + btnClass + ' disabled">首页</a><a href="javascript:void(0);" class="' + btnClass + ' disabled">上页</a>';
        } else {
            str += '<a href="' + clickEvent(1, 0) + '" class="' + btnClass + '">首页</a><a href="' + clickEvent((cp - 1), 0) + '" class="' + btnClass + '">上页</a>';
        }
        var len = 0;
        if (cp < 6 || (cp < 9 && _self.options.pageTotal < 9)) {
            if (_self.options.pageTotal > 8) {
                len = 8;
            } else {
                len = _self.options.pageTotal + 1;
            }
            for (var i = 1; i < len; i++) {
                if (i == cp) {
                    str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
                } else {
                    str += '<a href="' + clickEvent(i, cp) + '" class="' + numberClass + '">' + i + '</a>';
                }
            }
            if (_self.options.pageTotal > 8) {
                str += gap + '<a href="' + clickEvent(_self.options.pageTotal, 0) + '" class="' + numberClass + '">' + _self.options.pageTotal + '</a>';
            }
        } else if (cp > 5 && (_self.options.pageTotal - 5) >= cp && cp != _self.options.pageTotal) {
            turnpage += '<a href="' + clickEvent(1, 0) + '" class="' + numberClass + '">1</a>' + gap;
            var leng = cp - 2;
            for (var i = leng; i <= (cp + 2); i++) {
                if (i == cp) {
                    str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
                } else {
                    str += '<a href="'+clickEvent(i, cp) + '" class="' + numberClass + '">' + i + '</a>';
                }
            }
            str += gap + '<a href="' + clickEvent(_self.options.pageTotal, 0) + '" class="' + numberClass + '">' + _self.options.pageTotal + '</a>';
        } else {
            str += '<a href="' + clickEvent(1, 0) + '" class="' + numberClass + '">1</a>' + gap;
            for (var i = (_self.options.pageTotal - 6); i <= _self.options.pageTotal; i++) {
                if (i == cp) {
                    str += '<a href="javascript:void(0);" class="' + numberClass + ' choose">' + i + '</a>';
                } else {
                    str += '<a href="' + clickEvent(i, cp) + '" class="'+numberClass +'">' + i + '</a>';
                }
            }
        }
        if (_self.options.pageTotal == cp) {
            str += '<a href="javascript:void(0)" class="' + btnClass + ' disabled">下页</a><a class="' + btnClass + ' disabled" href="javascript:void(0);">末页</a>';
        } else {
            str += '<a href="' + clickEvent((cp + 1), cp) + '" class="' + btnClass + '">下一页</a><a href="' + clickEvent(_self.options.pageTotal, 0) + '"  class="' + btnClass + '">末页</a>';
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
            s = _self.options.name.replace("{cp}", page).replace("{mp}", options.mp).replace("c1","").replace("m20","");
        } else { //传值是一个函数
            s = 'javascript:void(0)" click="' + _self.options.name + '(' + page + ', ' + oldpage + ')"';
        }
        return s;
    }
};

module.exports = turnpage;
