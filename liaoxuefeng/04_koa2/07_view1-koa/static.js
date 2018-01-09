const pathTool = require("path");
const mime = require("mime");
const fs = require("mz/fs");

const loadStatic = (path = "/static") => {
    return async (ctx, next) => {
        const relativePath = ctx.request.path;
        if ( relativePath.startsWith(path) ) {
            const absolutePath = pathTool.join( __dirname, relativePath );
            if ( await fs.exists(absolutePath) ) {
                ctx.response.type = mime.getType(absolutePath);
                ctx.response.body = await fs.readFile(absolutePath);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    }
}

module.exports = loadStatic;