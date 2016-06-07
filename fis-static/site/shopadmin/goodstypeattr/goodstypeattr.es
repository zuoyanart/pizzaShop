/**
 * 模块相关操作
 * @method
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
let goodstypeattr = (function() {
    let $ = require('jquery');
    let tools = require('pizzatools');
    let common = require('common/common');
    let my = {};
    let options = {
        url: '/shopadmin/goodstypeattr/',
        tpl: __inline('../ejs/goodstypeattr.ejs'),
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
    my.get = function() {
            $("#inputtype").change(function() { ///绑定下拉change事件
                if ($(this).val() == "1") {
                    $("#attrvalue").removeAttr("disabled");
                } else {
                    $("#attrvalue").attr("disabled", "disabled");
                }
            });
            $("#catename").val(tools.getPara("catname"));

            let id = tools.getPara("id");
            if (id == "") {
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
                        if ($("#inputtype").val() == "1") {
                            $("#attrvalue").removeAttr("disabled");
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
                '#attrname': {
                    'must': true,
                    'minLength': 1,
                    'maxLength': 20,
                    focusMsg: "请输入属性名称",
                    errMsg: '属性不能为空或标题必须在1-20个字符之间'
                },
                '#inputtype': {
                    'must': true,
                    'minLength': 1,
                    'maxLength': 2,
                    focusMsg: "请选择商品录入方式",
                    errMsg: '录入方式必须在1-20个字符之间'
                },
                '#attrvalue': {
                    'must': false,
                    'minLength': 1,
                    'maxLength': 1000,
                    focusMsg: "请输入可选值",
                    errMsg: '可选值必须在1-1000个字符之间'
                },
                '#weight': {
                    'must': true,
                    'minLength': 1,
                    'maxLength': 4,
                    "reg": "int",
                    focusMsg: "请输入标题",
                    errMsg: '权重不能为空且必须在1-4位自然数'
                }
            },
            ajaxFun: function(data) {
                let id = tools.getPara("id");
                let catid = tools.getPara("catid");
                data += "&catid=" + catid;

                let op = "create";
                if (id != "") {
                    op = "update";
                    data += "&attrid=" + id;
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

    my.pageAll = function(catid, callback) {
            page(1, 500, catid,callback);
        }
        /**
         * 获取模块列表
         * @method page
         * @return {[type]} [description]
         */
    function page(cp, mp, catid, callback) {
        if (cp) {
            options.cp = cp;
        }
        if(!catid) {
          catid = tools.getPara("catid");
        }
        $.ajax({
            url: options.url + 'page',
            data: 'cp=' + options.cp + '&mp=' + options.mp + '&kw=' + $.trim($('#searchkw').val()) + "&catid=" + catid,
            success: function(msg) {
              console.log(typeof(callback));
                if (typeof(callback) == "function") {
                  callback(msg);
                } else {
                    var data = msg.msg;
                    data.catid = tools.getPara("catid");
                    data.catname = escape(tools.getPara("catname"));

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
                        $('#goodstypeattr_' + ids[i]).parent().parent().remove();
                    }
                }
            }
        });
    }


    return my;
}());

module.exports = goodstypeattr;
