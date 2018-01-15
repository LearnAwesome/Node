const fs = require("fs");
const pathTool = require("path");
const router = require("koa-router")();

const addMapping = mapping => {
    Object.keys(mapping).forEach(key => {
        if ( key.startsWith("GET") ) {
            router.get( key.substring(4), mapping[key] );
        } else if ( key.startsWith("POST") ) {
            router.post( key.substring(5), mapping[key] );
        }
    });
}

const addController = (path = "/controllers") => {
    const absolutePath = pathTool.join( __dirname, path );
    const filename = fs.readdirSync( absolutePath );
    filename.forEach(file => {

        if ( file.endsWith(".js") ) {
            const filePath = pathTool.join( absolutePath, file.substring(0, file.length - 3) );
            const mapping = require( filePath );
            addMapping( mapping );
        }

    });
};

module.exports = () => {
    addController();
    return router.routes();
};