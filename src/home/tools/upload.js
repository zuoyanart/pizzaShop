'use strict';

import fs from 'fs';
import tools from './tools.js';
import qiniu from "qiniu";
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
    static localImg(file, bucket, cb) {
        let fileConfig = { //允许
            exten: ';jpg;jpeg;png;', //扩展名
            maxSize: 5242880, //文件最大大小，单位B
            static: think.ROOT_PATH + '/www', //图片保存目录
            toPath: '/upload/' + think.datetime().split(' ')[0].replace(/-/g, '/') //生成的文件路径：/upload/2016/02/01
        };
        let finalFileName = ''; //最终的文件名称
        let fileExt = file.path.split('.')[1];
        if (fileConfig.exten.indexOf(';' + fileExt + ';') == -1 || file.headers.size > fileConfig.maxSize) { //判断限制条件
            return finalFileName;
        }

        //处理后缀和文件名
        finalFileName = '/' + think.uuid().toLowerCase() + '.' + fileExt;
        think.mkdir(fileConfig.static + fileConfig.toPath);
        //读取文件
        //  let fileData = await tools.readFile(file.path);
        //  let success = await tools.writeFile(fileConfig.static + fileConfig.toPath + finalFileName, fileData);

        fs.renameSync(file.path, fileConfig.static + fileConfig.toPath + finalFileName);

        if (think.config("cloudImg")) { //图片要云存储
            qiniu.conf.ACCESS_KEY = 'N2ZLDokzlA6WmlWd_3vVgVQGWrm0EBMKnUNMYZmP';
            qiniu.conf.SECRET_KEY = 'meMtSGAFyt5oA3jSRs7rjI5MrECZ3Ncfi07VffQU';
            //要上传的空间
            let bucket = 'shop';
            //上传到七牛后保存的文件名
            let key = fileConfig.toPath.replace('/upload/', '/') + finalFileName;
            //构建上传策略函数
            function uptoken(bucket, key) {
                var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
                return putPolicy.token();
            }

            //生成上传 Token
            let token = uptoken(bucket, key);

            //要上传文件的本地路径
            let filePath = fileConfig.static + fileConfig.toPath + finalFileName;

            //构造上传函数
            function uploadFile(uptoken, key, localFile) {
                var extra = new qiniu.io.PutExtra();
                qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
                    if (!err) {
                        // 上传成功， 处理返回值
                        console.log(ret.hash, ret.key, ret.persistentId);
                        cb(err, ret);
                    } else {
                        // 上传失败， 处理返回代码
                        console.log(err);
                        ret.file = fileConfig.toPath + finalFileName;
                        cb(err);
                    }
                });
            }
            //调用uploadFile上传
            uploadFile(token, key, filePath)
        } else {
            cb(null, {
                key: fileConfig.toPath + finalFileName
            });
        }
    }
}
