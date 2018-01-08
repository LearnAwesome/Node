const router = require("koa-router")();
const fs = require("fs");
const pathTool = require("path");

const addMapping = mapping => {
    Object.keys(mapping).forEach(method => {
        if ( method.startsWith("GET") ) {
            const path = method.substring(4);
            router.get(path, mapping[method]);
            console.log(`register URL mapping: ${method}`);
        } else if ( method.startsWith("POST") ) {
            const path = method.substring(5);
            router.post(path, mapping[method]);
            console.log(`register URL mapping: ${method}`);
        } else if ( method.startsWith("PUT") ) {
            const path = method.substring(4);
            router.put(path, mapping[method]);
            console.log(`register URL mapping: ${method}`);
        } else if ( method.startsWith("DELETE") ) {
            const path = method.substring(7);
            router.del(path, mapping[method]);
            console.log(`register URL mapping: ${method}`);
        }
    });
};

const initRouter = path => {
    const group = fs.readdirSync(path).filter(filename => {
        return filename.endsWith(".js");
    });
    group.forEach(filename => {
        console.log(`process controller:${filename}`);
        const mapping = require( path + "/" + filename );
        addMapping(mapping);
    });
};

const initController = (path = "/controllers") => {
    path = pathTool.join(__dirname, path);
    initRouter(path);
    return router.routes();
};

module.exports = initController;