const fs = require("fs");
const router = require("koa-router")();

const addMapping = mapping => {
    Object.keys(mapping).forEach(url => {
        if ( url.startsWith("GET") ) {
            const path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`Register URL mapping: GET ${path}`);
            return;
        }
        if ( url.startsWith("POST") ) {
            const path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`Register URL mapping: POST ${path}`);
            return;
        }
        console.log(`Invalid URL ${url}`);
    });
};

const addController = controller_dir => {
    const files = fs.readdirSync(__dirname + controller_dir);
    files.forEach(file => {
        if ( file.endsWith(".js") ) {
            console.log( `Process controller: ${file}` );
            const mapping = require(__dirname + controller_dir + file);
            addMapping(mapping);
        }
    });
};

module.exports = dir => {
    const controller_dir = dir || "/controllers/";
    addController(controller_dir);
    return router.routes();
};