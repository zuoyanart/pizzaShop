/**
 * 模块相关操作
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
let goods = (function() {
    let $ = require('jquery');
    let tools = require('pizzatools');
    let common = require('common/common');
    let my = {};
    let options = {
        url: '/shopadmin/goods/',
        tpl: __inline('../ejs/goods.ejs'),
        cp: 1,
        mp: 20
    };
    let isScroll = true;

    /**
     * 初始化执行函数
     * @method function
     * @return {[type]} [description]
     */
    my.init = function() {
            eventBind(); //绑定所有交互操作
            page(1); //
            scrollEvent(); //绑定滚动条事件
            common.checkAll('#checkall'); //checkall
            common.kwSearch('#searchkw', function() {
                page(1);
            });
        }
        /**
         * 编辑模块
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.get = (callback) => {
            let id = parent.document.location.href.split('=')[1];
            if (!id) {
                return;
            }
            $.ajax({
                url: options.url + 'get',
                data: 'id=' + id,
                success: function(result) {
                    if (result.state == true) {
                        for (var key in result.msg) {
                            $('#' + key).val(result.msg[key]);
                        }
                        if (typeof(editor) != "undefined") {
                            editor.html(result.msg.goods_desc);
                        }
                        if (typeof(callback) == "function") {
                            callback();
                        }
                    }
                }
            });
        }
        /**
         * 获取商品相册
         * @method function
         * @return {[type]} [description]
         */
    my.getGallery = () => {
        let id = parent.document.location.href.split('=')[1]; //获取goodsid
        if (!id) {
            return;
        }
        $.ajax({
            url: options.url + 'pagegallery',
            data: 'id=' + id,
            success: function(result) {
                if (result.state == true) {
                    let i = 0;
                    for (let j = 0; j < result.msg.length; j++) {
                        $('#img_url-' + j).val(result.msg[j].img_url);
                    }
                }
            }
        });
    }

    /**
     * 编辑模块
     * @method function
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    my.edit = function(obj) {
            $(".form").pizzaValidate({
                'fields': {
                    '#catname': {
                        'must': true,
                        'minLength': 1,
                        'maxLength': 20,
                        focusMsg: "请输入商品类型名称",
                        errMsg: '标题不能为空或标题必须在1-20个字符之间'
                    },
                },
                ajaxFun: function(data) {
                    let id = tools.getPara("id");
                    let op = "create";
                    if (id != "") {
                        op = "update";
                        data += "&id=" + id;
                    }
                    $.ajax({
                        url: options.url + op,
                        data: data,
                        success: function(msg) {
                            if (msg.state == true) {
                                history.back();
                            }
                        }
                    });
                }
            });
        }
        /**
         * 获取模块列表
         * @method page
         * @return {[type]} [description]
         */
    function page(cp, mp) {
        if (cp) {
            options.cp = cp;
        }
        $.ajax({
            url: options.url + 'page',
            data: 'cp=' + options.cp + '&mp=' + options.mp + '&kw=' + $.trim($('#searchkw').val()),
            success: function(msg) {
                let s = new EJS({
                    text: options.tpl
                }).render({
                    data: msg.msg
                });
                if (cp == 1) {
                    $('#list').html(s);
                } else {
                    $('#list').append(s);
                }
                options.cp += 1;
                isScroll = true;
            }
        });
    }
    /**
     * 操作事件绑定
     * @method eventBind
     * @return {[type]}  [description]
     */
    function eventBind() {
        $('#list').on('click', 'li > span > i', function() {
            let cl = $(this).attr('class');
            console.log(cl);
            if (cl) {
                action[cl].call(this, $(this));
            }
        });
        $('#main > div.menu').on('click', 'em', function() {
            let cl = $(this).attr('class');
            if (cl) {
                action[cl].call(this, $(this));
            }
        });
    }
    /**
     * 滚动条滚动事件
     * @method scrollEvent
     * @return {[type]}    [description]
     */
    function scrollEvent() {
        $(window).scroll(function() {
            let docHeight = document.body.scrollHeight;
            let scrollTop = 0; //滚动条高度
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            let bottomHeight = docHeight - scrollTop - $(window).height();
            //console.log(bottomHeight);
            //console.log(isScroll);
            if (bottomHeight < 100 && isScroll == true) {
                page();
                isScroll = false;
            }
        });
    }
    /////action
    let action = {};
    /**
     *
     * @method remove
     * @return {[type]} [description]
     */
    action.remove = function(obj) {
        let id = common.getCheckId(obj);
        console.log(id);
        if (id == '0') {
            return;
        }
        $.ajax({
            url: options.url + 'remove',
            data: 'id=' + id,
            success: function(msg) {
                if (msg.state == true) {
                    let ids = id.split(',');
                    for (var i = 0, ll = ids.length; i < ll; i++) {
                        $('#goods_' + ids[i]).parent().parent().remove();
                    }
                }
            }
        });
    }


    return my;
}());

module.exports = goods;
