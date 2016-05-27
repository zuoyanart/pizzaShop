/**
 * 工具类单元测试
 */
import tools from '../../../home/tools/tools.js';
var expect = require("chai").expect;

describe("xss", function() {
   it("纯文本", function() {
      expect(tools.xss("asdasd")).to.be.equal("asdasd");
   });
   it('超链接脚本过滤', function() {
      expect(tools.xss('asdasd<a href="javascript:alert(0);">asd</a>')).to.be.equal("asdasd<a href>asd</a>");
   });
});

 describe("readFile", function() {
   it("文件存在", async function() {
    var t = await tools.readFile("/data/host/pizzaManage/app/test/readfile.tes1t");
    expect(t).to.be.contain("asd");
  });
});

 describe("httpAgent", function() {
  describe("连接地址可以访问", function() {
    it("get方法", async function() {
      var t = await tools.httpAgent("http://www.baidu.com", "get");
      expect(JSON.stringify(t)).to.contain("{}");
    });

  });
});
