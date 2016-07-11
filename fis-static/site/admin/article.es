/**
 * 文章相关操作
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
let article = (function() {
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
        url: '/admin/article/',
        tpl: __inline('./ejs/article.ejs'),
        cp: 1,
        mp: 20
    };

    let cmtOption = { //评论相关操作
        url: '/admin/comment/',
        tpl: __inline('./ejs/comment.ejs'),
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
            //绑定节点切换事件
            node.pageall(function(data) {
                let no = $('#node')
                no.html(data);
                no.pizzaSelect({
                    onChange: function(obj) {
                        page(1);
                    }
                });
                page(1); //
            });

            common.kwSearch('#searchkw', function() {
                page(1);
            });


        }
        /**
         * 编辑文章
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.get = function() {
            let id = tools.getPara("id");
            if (id == "") {
                node.pageall(function(data) {
                    let no = $('#nodeid');
                    no.html(data);
                    no.pizzaSelect({});
                    my.edit();
                });
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
                        $('#pass').attr("val", msg.msg.pass);
                        $('#reco').attr("val", msg.msg.reco);
                        $('.select').pizzaSelect();

                        node.pageall(function(data) {
                            let no = $('#nodeid');
                            no.attr('val', msg.msg.nodeid);
                            no.html(data);
                            no.pizzaSelect({});
                            my.edit();
                        });
                        editor.html(msg.msg.content);
                    }
                }
            });
        }
        /**
         * 编辑文章
         * @method function
         * @param  {[type]} obj [description]
         * @return {[type]}     [description]
         */
    my.edit = function() {
            $(".form").pizzaValidate({
                'fields': {
                    '#title': {
                        'must': true,
                        'minLength': 5,
                        'maxLength': 48,
                        focusMsg: "请输入标题",
                        errMsg: '标题不能为空或标题必须在5-48个字符之间'
                    },
                    '#nodeid': {
                        'must': true,
                        'minLength': 1,
                        'maxLength': 12,
                        focusMsg: "请选择节点",
                        errMsg: '请选择节点'
                    },
                    '#timg': {
                        'must': false,
                        'minLength': 1,
                        'maxLength': 100,
                        focusMsg: "请上传标题图片(非必填)",
                        errMsg: '标题图须在1-100个字符之间'
                    },
                    '#link': {
                        'must': false,
                        'minLength': 8,
                        'maxLength': 150,
                        focusMsg: "请输入自定义链接(非必填)",
                        errMsg: '自定义链接须在8-150个字符之间'
                    },
                    '#source': {
                        'must': false,
                        'minLength': 2,
                        'maxLength': 30,
                        focusMsg: "请输入文章来源(非必填)",
                        errMsg: '文章来源须在2-30个字符之间'
                    },
                    '#brief': {
                        'must': false,
                        'minLength': 2,
                        'maxLength': 300,
                        focusMsg: "请输入文章描述(非必填)",
                        errMsg: '文章描述须在2-300个字符之间'
                    },
                    '#tags': {
                        'must': false,
                        'minLength': 2,
                        'maxLength': 30,
                        focusMsg: "请输入文章标签，空格隔开(非必填)",
                        errMsg: '文章标签须在2-30个字符之间'
                    },
                    '#pass': {
                        'must': true,
                        'minLength': 1,
                        'maxLength': 3,
                        focusMsg: " ",
                        errMsg: ' '
                    },
                    '#reco': {
                        'must': false,
                        'minLength': 1,
                        'maxLength': 3,
                        focusMsg: " ",
                        errMsg: ' '
                    },
                },
                ajaxFun: function(data) {
                    let id = tools.getPara("id");
                    let op = "create";
                    if (id != "") {
                        op = "update";
                        data += '&id=' + id;
                    }
                    data += '&content=' + escape(editor.html());
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
         * 获取文章列表
         * @method page
         * @return {[type]} [description]
         */
    function page(cp, mp) {
        if (cp) {
            options.cp = cp;
        }
        $.ajax({
            url: options.url + 'page',
            data: 'cp=' + options.cp + '&mp=' + options.mp + '&kw=' + $.trim($('#searchkw').val()) + '&nodeid=' + $('#node').val(),
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
            layer.confirm("确定要删除该文章吗？", {
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
                                $('#article_' + ids[i]).parent().parent().remove();
                            }
                        }
                    }
                });
            });
        }
        /**
         * 审核文章
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
                                let oo = $('#article_' + ids[i]).parent().parent();
                                oo.find('b').remove();
                                oo.find('i.pass').html('取消审核');
                            }
                        } else { //取消审核
                            for (let i = 0, ll = ids.length; i < ll; i++) {
                                let oo = $('#article_' + ids[i]).parent().parent();
                                oo.children('a').after('<b>[未审核]</b>');
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
         * 获取文章评论列表
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
                        name: "article.commentPage",
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
     * 获取文章评论对外接口
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

module.exports = article;
