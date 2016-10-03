var addr = () => {
    let self = {};
    let $ = require("jquery");

    self.init = () => {
        $("#province").on("change", () => {
            $.ajax({
                type: "post",
                url: "/user/addr/getcity",
                data: "areaid=" + $("#province").find("option:selected").attr("data"),
                success: function(msg) {
                    var s = '';
                    for (var i = 0; i < msg.result.length; i++) {
                        s += '<option value="'+ msg.result[i].name+'" data="'+ msg.result[i].area_id+'">' + msg.result[i].name + '</option>';
                    }
                    console.log(s);
                    $("#city").html(s);
                }
            })
        });
        $("#city").on("change", () => {
            $.ajax({
                type: "post",
                url: "/user/addr/getcity",
                data: "areaid=" + $("#city").find("option:selected").attr("data"),
                success: function(msg) {
                    var s = '';
                    for (var i = 0; i < msg.result.length; i++) {
                        s += '<option>' + msg.result[i].name + '</option>';
                    }
                    console.log(s);
                    $("#county").html(s);
                }
            })
        });
    }

    return self;
}();

module.exports = addr;
