/**
 * 文章系统特有全局函数
 * @method
 * @param  {[type]} filePath [description]
 * @return {[type]}          [description]
 */
global.Article = {
    /**
     * 格式化article的连接地址
     * @method
     * @param  {[type]} link      =             "" [description]
     * @param  {[type]} articleid =             0  [description]
     * @return {[type]}           [description]
     */
    getLink: (link = "", articleid = 0) => {
        return link == "" ? "/content/" + articleid : link;
    }
}
