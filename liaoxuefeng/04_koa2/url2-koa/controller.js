const router = require("koa-router")();
const fs = require("fs");

const addMapping = (router, mapping) => {
    Object.keys(mapping).forEach(url => {
        if ( url.startsWith("GET") ) {
            const path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if ( url.startsWith("POST") ) {
            const path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    });
};

const addControllers = router => {
    const files = fs.readdirSync(__dirname + "/controllers");
    files.forEach(file => {
        if ( file.endsWith('.js') ) {
            console.log(`Processing controller ${file}...`);
            const mapping = require(__dirname + "/controllers/" + file);
            addMapping(router, mapping);
        }
    });
}

module.exports = dir => {
    const controller_dir = dir || "/controllers";
    addControllers(router);
    return router.routes();
};