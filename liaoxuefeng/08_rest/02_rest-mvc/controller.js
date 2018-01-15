const pathTool = require( "path" );
const fs = require( "mz/fs" );
const router = require( "koa-router" )();

const addMapping = path => {
    const exp = require( path );
    for ( let key of Object.keys( exp ) ) {
        if ( key.startsWith( "GET" ) ) {
            router.get( key.substring(4), exp[key] );
        } else if ( key.startsWith( "POST" ) ) {
            router.post( key.substring(5), exp[key] );
        } else if ( key.startsWith( "PUT" ) ) {
            router.put( key.substring(4), exp[key] );
        } else if ( key.startsWith( "DELETE" ) ) {
            router.del( key.substring(7), exp[key] );
        }
    }
};

const addController = async path => {
    const dirPath = pathTool.join( __dirname, path );
    const files = await fs.readdir( dirPath );
    for ( let name of files ) {
        if ( name.endsWith( ".js" ) ) {
            const filePath = pathTool.join( dirPath, name );
            addMapping( filePath );
        }
    }
};

module.exports = (path = "/controllers") => {
    addController(path);
    return router.routes();
}