'use strict';

/**
 * hook config
 * https://thinkjs.org/doc/middleware.html#toc-df6
 */
export default {
    payload_parse: ['prepend', 'parse_wechat'], //在前面追加解析 xml
}
