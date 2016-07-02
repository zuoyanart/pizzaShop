/**
 * 留言板相关操作
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
let guestbook = (function() {
    let $ = require('jquery');
    let tools = require('pizzatools');
    let common = require('common/common');
    let node = require('admin/tree/tree');
    let trunpage = require("trunpage/trunpage"); //获取翻页
    let pizzalayer = require("pizzalayer"); //获取翻页
    let tppage = null; //翻页的实例化
    let commentObj = null;

    require('pizzaui');
    let my = {};
    let options = {
        url: '/admin/guestbook/',
        tpl: __inline('../ejs/guestbook.ejs'),
        cp: 1,
        mp: 20
    };

    let cmtOption = { //评论相关操作
        url: '/admin/comment/',
        tpl: __inline('../ejs/comment.ejs'),
        cp: 1,
        mp: 10
    }

    let isScroll = true;

    /**
     * 初始化执行函数
     * @method function
     * @return {[type]} [description]
     */
    my.init = function() {
            eventBind(); //绑定所有交互操作
            scrollEvent(); //绑定滚动条事件
            common.checkAll('#checkall'); //checkall
            page(1); //
            common.kwSearch('#searchkw', function() {
                page(1);
            });
        }
        /**
         * 编辑留言板
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.get = function() {
            let id = tools.getPara("id");
            if (id == '') {
                return;
            }
            $.ajax({
                url: options.url + 'get',
                data: 'id=' + id,
                success: function(msg) {
                    if (msg.state == true) {
                      let title = msg.msg.brief.split('$');
                      msg.msg.username = title[0];
                      msg.msg.phone = title[1];
                      msg.msg.mail = title[2];
                      msg.msg.addr = title[3];
                        for (let key in msg.msg) {
                            $('#' + key).val(msg.msg[key]);
                        }
                    }
                }
            });
        }
        /**
         * 编辑留言板
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.edit = function() {
            $(".form").pizzaValidate({
                'fields': {
                    '#username': {
                        'must': true,
                        'minLength': 1,
                        'maxLength': 30,
                        focusMsg: "请输入姓名",
                        errMsg: '姓名不能为空或姓名必须在1-30个字符之间'
                    },
                    '#phone': {
                        'must': true,
                        'minLength': 6,
                        'maxLength': 30,
                        focusMsg: "请输入手机",
                        errMsg: '手机不能为空或手机必须在5-2000个字符之间'
                    },
                    '#mail': {
                        'must': true,
                        'minLength': 3,
                        'maxLength': 100,
                        focusMsg: "请输入邮箱地址",
                        errMsg: '邮箱不能为空或邮箱必须在3-100个字符之间'
                    },
                    '#addr': {
                        'must': true,
                        'minLength': 2,
                        'maxLength': 300,
                        focusMsg: "请输入地址",
                        errMsg: '地址不能为空或地址必须在2-300个字符之间'
                    },
                    '#des': {
                        'must': true,
                        'minLength': 5,
                        'maxLength': 2000,
                        focusMsg: "请输入留言内容",
                        errMsg: '留言内容不能为空或留言内容必须在5-2000个字符之间'
                    },
                    '#pass': {
                        'must': true,
                        'minLength': 1,
                        'maxLength': 2,
                        focusMsg: "请选择是否审核",
                        errMsg: '请选择是否审核'
                    },
                    '#brief': {
                        'must': false,
                        'minLength': 2,
                        'maxLength': 2000,
                        focusMsg: "请输入留言板描述(非必填)",
                        errMsg: '留言板描述须在2-2000个字符之间'
                    },
                },
                ajaxFun: function(data) {
                    let id = tools.getPara("id");
                    let op = "create";
                    if (id != "") {
                        op = "update";
                        data += '&id=' + id;
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
         * 获取留言板列表
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
                    data: msg.msg,
                    tools: tools
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
            layer.confirm("确定要删除该留言板吗？", {
                icon: 3,
                title: '警告'
            }, function(index) {
                $.ajax({
                    url: options.url + 'remove',
                    data: 'id=' + id,
                    success: function(msg) {
                        if (msg.state == true) {
                            let ids = id.split(',');
                            layer.close(index);
                            for (let i = 0, ll = ids.length; i < ll; i++) {
                                $('#guestbook_' + ids[i]).parent().parent().remove();
                            }
                        }
                    }
                });
            });
        }
        /**
         * 审核留言板
         * @method function
         * @return {[type]} [description]
         */
    action.pass = (obj) => {
            let id = common.getCheckId(obj);
            if (id == '0') {
                return;
            }
            let ispass = "false";
            if (obj.html() == '审核') {
                ispass = "true";
            }
            $.ajax({
                url: options.url + 'pass',
                data: 'id=' + id + '&ispass=' + ispass,
                success: function(msg) {
                    if (msg.state == true) {
                        let ids = id.split(',');
                        if (ispass == "true") { //审核
                            for (let i = 0, ll = ids.length; i < ll; i++) {
                                console.log(ids[i]);
                                let oo = $('#guestbook_' + ids[i]).parent().parent();
                                oo.find('b.pass').remove();
                                oo.find('i.pass').html('取消审核');
                            }
                        } else { //取消审核
                            for (let i = 0, ll = ids.length; i < ll; i++) {
                                let oo = $('#guestbook_' + ids[i]).parent().parent();
                                oo.children('span').before('<b class="pass">[未审核]</b>');
                                oo.find('i.pass').html('审核');
                            }
                        }
                    }
                }
            });
        }
        /**
         * 显示评论
         * @method function
         * @param  {[type]} * [description]
         * @return {[type]}   [description]
         */
    action.comment = function(obj) {
            commentObj = obj;
            let ocomment = $(".commentlist");
            if (ocomment.length == 1) {
                ocomment.next("div").remove();
                ocomment.remove();
            } else {
                commentPage(1, 0);
            }
        }
        /**
         * 删除评论
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    action.commentRemove = function(obj) {
            layer.confirm("您确定要删除该评论吗？", {
                title: "提示"
            }, function(index) {
                let id = obj.parent().parent().attr("id").split("_")[1];
                $.ajax({
                    url: cmtOption.url + "del",
                    data: "id=" + id,
                    success: function(msg) {
                        if (msg.state == true) {
                            $("#comment_" + id).remove();
                        }
                    }
                })
                layer.close(index);
            });
        }
        /**
         * 获取留言板评论列表
         * @method commentPage
         * @param  {[type]}    obj [description]
         * @param  {[type]}    cp  [description]
         * @return {[type]}        [description]
         */
    function commentPage(cp, oldcp) {
        cp = cp ? cp : 1;
        oldcp = oldcp ? oldcp : 0;
        let id = common.getId(commentObj);
        let opli = commentObj.parent().parent();
        $.ajax({
            url: cmtOption.url + 'page',
            data: 'id=' + id + "&cp=" + cp + "&mp=" + cmtOption.mp,
            success: function(msg) {
                if (msg.state == false) {
                    pizzalayer.msg({
                        msg: '获取列表失败，请稍后重试'
                    });
                    return;
                }
                if (msg.count == 0) {
                    pizzalayer.msg({
                        msg: '暂无评论'
                    });
                    return;
                }
                if (cp == 1) { //实例化翻页对象
                    tpage = new trunpage({
                        name: "guestbook.commentPage",
                        sum: msg.count,
                        mp: cmtOption.mp
                    });
                }
                let s = new EJS({
                    text: cmtOption.tpl
                }).render({
                    data: msg.msg
                });
                opli.next("ul").remove();
                opli.next("div").remove();
                opli.after(s + tpage.hunde(cp));
                cmtOption.cp += 1;
            }
        });
    }
    /**
     * 获取留言板评论对外接口
     * @method function
     * @param  {[type]} obj [description]
     * @param  {[type]} cp  [description]
     * @return {[type]}     [description]
     */
    my.commentPage = function(cp, oldcp) {
        commentPage(cp, oldcp);
    }


    return my;
}());

module.exports = guestbook;
