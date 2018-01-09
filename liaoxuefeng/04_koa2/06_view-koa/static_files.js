const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

function staticFiles(url) {
    return async (ctx, next) => {
        let relativePath = ctx.request.path; // 请求文件的相对路径：/static/css/bootstrap.css
        if (relativePath.startsWith(url)) { // 核对是否来自目标目录
            let absolutePath = path.join(__dirname, relativePath); //请求文件的绝对路径 c:\Users\MichaelLu\git\github.com\learn-node\liaoxuefeng\04_koa2\view-koa\static\css\bootstrap.css
            if (await fs.exists(absolutePath)) { // 核对文件是否存在
                ctx.response.type = mime.getType(relativePath); // 使用MIME模块获取文件传输类型
                ctx.response.body = await fs.readFile(absolutePath); // 回应文件
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    };
}

module.exports = staticFiles;
