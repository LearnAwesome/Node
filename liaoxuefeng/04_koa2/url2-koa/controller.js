const router = require("koa-router")();
const fs = require("fs");

class Controller {

    constructor(controllersDir = "/controllers/") {
        Controller.addControllers(controllersDir);
        return router.routes();
    }

    /**
     * 扫描控制层
     * @param {String} controllersDir 控制层目录
     */
    static addControllers(controllersDir) {
        // __dirname node中的全局变量 当前文件的绝对路径
        // console.log(__dirname); // c:\Users\MichaelLu\git\github.com\learn-node\liaoxuefeng\04_koa2\url2-koa
        const files = fs.readdirSync(__dirname + controllersDir); //["index.js"]
        files.forEach(file => {
            if ( file.endsWith('.js') ) { //["index.js"]
                console.log(`Processing controller ${file}...`);
                // __dirname => c:\Users\MichaelLu\git\github.com\learn-node\liaoxuefeng\04_koa2\url2-koa
                // controllersDir => /controllers/
                // file => index.js
                // c:\Users\MichaelLu\git\github.com\learn-node\liaoxuefeng\04_koa2\url2-koa/controllers/index.js
                const mapping = require(__dirname + controllersDir + file);
                Controller.addMapping(mapping);
            }
        });
    }

    /**
     * 注册路由
     * @param {Object} mapping 路由方法
     */
    static addMapping(mapping) {
        Object.keys(mapping).forEach(url => {
            if ( url.startsWith("GET") ) {
                const path = url.substring(4); // /
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            } else if ( url.startsWith("POST") ) {
                const path = url.substring(5); // /login
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
            } else {
                console.log(`invalid URL: ${url}`);
            }
        });
    }

}

module.exports = Controller;