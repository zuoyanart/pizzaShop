'use strict';

import fs from 'fs';
import tools from './tools.js';
/**
 * 上传相关操作
 */
export default class {
  /**
   * 本地上传方法
   * @method local
   * @param  {[type]} file   上传的file对象
   *file: { fieldName: 'imgFile',
     originalFilename: '152917.62810508_900.jpg',
     path: '/data/host/thinkjs/runtime/upload/XQpGvfJrQoXjYQ_WfoST_vCP.jpg',
     headers:
      { 'content-disposition': 'form-data; name="imgFile"; filename="152917.62810508_900.jpg"',
        'content-type': 'image/jpeg' },
        size: 101700 }
      }
   * @return {[type]}           [description]
   */
   static async localImg(file) {
     let fileConfig = {//允许
       exten: ';jpg;jpeg;png;',//扩展名
       maxSize: 5242880,//文件最大大小，单位B
       static: think.ROOT_PATH +'/www',//图片保存目录
       toPath: '/upload/' + think.datetime().split(' ')[0].replace(/-/g, '/')//生成的文件路径：/upload/2016/02/01
     };
     let finalFileName = '';//最终的文件名称
     let fileExt = file.path.split('.')[1];
     if(fileConfig.exten.indexOf(';' + fileExt+';') == -1 || file.headers.size > fileConfig.maxSize) {//判断限制条件
       return finalFileName;
     }

     //处理后缀和文件名
     finalFileName = '/' + think.uuid().toLowerCase() + '.' + fileExt;
     think.mkdir(fileConfig.static + fileConfig.toPath);
     //读取文件
     let fileData = await tools.readFile(file.path);
     let success = await tools.writeFile(fileConfig.static + fileConfig.toPath + finalFileName, fileData);
     return  fileConfig.toPath + finalFileName;
   }
}
