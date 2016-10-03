
var addr = ()=>{
  let self = {};
  self.init = () =>{
    $("#province").on("change", ()=>{
       $.ajax({
         url:"/user/addr/getcity",
         data: "areaid" + $(this).attr("data"),
         success: function(msg) {
           var s = '';
           for(var i=0;i<msg.result.length;i++) {
             s += '<option>'+msg.result[i].name+'</option>';
           }
           console.log(s);
           $("#city").html(s);
         }
       })
    });
  }

  return self;
}();

module.exports = addr;
