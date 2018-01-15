const Koa = require( "koa" );
const bodyParser = require( "koa-bodyparser" );
const controller = require( "./controller" );
const restify = require( "./rest" ).restify;

const app = new Koa();
const port = 3000;

app.use( async ( ctx, next ) => {
    console.log( `Process Method:${ ctx.request.method } Url:${ ctx.request.url }...` );
    await next();
} );

app.use( bodyParser() );

app.use( restify() );

app.use( controller() );

app.listen( port );

console.log(`Server is running at port: ${ port }...`);