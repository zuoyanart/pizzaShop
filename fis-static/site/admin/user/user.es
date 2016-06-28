/**
 * 用户相关操作
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
let user = (function() {
    let $ = require('jquery');
    let tools = require('pizzatools');
    let common = require('common/common');
    require('pizzaui');
    let my = {};
    let options = {
        url: '/admin/user/',
        tpl: __inline('../ejs/user.ejs'),
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
         * 编辑用户
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.get = function() {
            let id = tools.getPara("id");
            if (id == "") {
                return;
            }
            $.ajax({
                url: options.url + 'get',
                data: 'id=' + id,
                success: function(msg) {
                    if (msg.state == true) {
                        for (let key in msg.msg) {
                            $('#' + key).val(msg.msg[key]);
                        }
                    }
                }
            });
        }
        /**
         * 编辑用户
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.edit = function() {
            let id = tools.getPara("id");
            $(".form").pizzaValidate({
                'fields': {
                    '#username': {
                        'must': true,
                        'minLength': 3,
                        'maxLength': 20,
                        focusMsg: "请输入用户名",
                        errMsg: '用户名必须在3-20个字符之间'
                    },
                    '#nickname': {
                        'must': true,
                        'minLength': 3,
                        'maxLength': 20,
                        focusMsg: "请输入昵称",
                        errMsg: '昵称必须在3-20个字符之间'
                    },
                    '#password': {
                        'must': id == '' ? true : false,
                        'minLength': 6,
                        'maxLength': 25,
                        focusMsg: id == '' ? "请输入密码" : "请输入密码,不填写将不更新密码",
                        errMsg: '密码必须6-25个字符之间'
                    },
                },
                ajaxFun: function(data) {
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
         * 获取用户列表
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
            if (id == '0') {
                return;
            }
            $.ajax({
                url: options.url + 'remove',
                data: 'id=' + id,
                success: function(msg) {
                    if (msg.state == true) {
                        let ids = id.split(',');
                        for (let i = 0, ll = ids.length; i < ll; i++) {
                            $('#user_' + ids[i]).parent().parent().remove();
                        }
                    }
                }
            });
        }
        /**
         * 冻结用户
         * @method function
         * @return {[type]} [description]
         */
    action.pass = function(obj) {
        let id = common.getCheckId(obj);
        if (id == '0') {
            return;
        }
        let ispass = "false";
        if (obj.html() == '冻结') {
            ispass = "true";
        }
        $.ajax({
            url: options.url + 'pass',
            data: 'id=' + id + '&ispass=' + ispass,
            success: function(msg) {
                if (msg.state == true) {
                    let ids = id.split(',');
                    if (ispass == "true") { //冻结
                        for (let i = 0, ll = ids.length; i < ll; i++) {
                            let oo = $('#' + ids[i]).parent().parent();
                            if (oo.children("b").length == 0) {
                                oo.children('a').after('<b>[已冻结]</b>');
                            }
                            oo.find('i.pass').html('取消冻结');
                        }
                    } else { //取消冻结
                        for (let i = 0, ll = ids.length; i < ll; i++) {
                            let oo = $('#' + ids[i]).parent().parent();
                            oo.find('b').remove();
                            oo.find('i.pass').html('冻结');
                        }
                    }
                }
            }
        });
    }


    return my;
}());

module.exports = user;
