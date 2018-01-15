const APIError = require( "../rest" ).APIError;
const products = require( "../products" );

const api = {
    "GET /api/products": async ( ctx, next ) => {
        const res = products.getProducts();
        ctx.rest( res );
    },
    "GET /api/products/:id": async ( ctx, next ) => {
        const id = ctx.params.id;
        const res = products.getProduct( id );
        ctx.rest( res );
    },
    "POST /api/products": async ( ctx, next ) => {
        const { name, manufacturer, price } = ctx.request.body;
        const res = { name, manufacturer, price };
        products.createProduct( res );
        ctx.rest( res );
    },
    "PUT /api/products/": async ( ctx, next ) => {
        const { name, manufacturer, price } = ctx.request.body;
        const res = { name, manufacturer, price };
        products.alterProduct( res );
        ctx.rest( res );
    },
    "DELETE /api/products/:id": async ( ctx, next ) => {
        const id = ctx.params.id;
        const res = products.deleteProduct( id );
        ctx.rest( res );
    }
};

module.exports = api;