/**
 * seo特有全局函数
 * @method
 * @param  {[type]} filePath [description]
 * @return {[type]}          [description]
 */
global.SEO = {
    /**
     * 格式化article的连接地址
     * @method
     * @param  {[type]} link      =             "" [description]
     * @param  {[type]} articleid =             0  [description]
     * @return {[type]}           [description]
     */
    getTitle: (title = "") => {
        return title == "" ? think.config("title", undefined, "home") : title;
    }
}
