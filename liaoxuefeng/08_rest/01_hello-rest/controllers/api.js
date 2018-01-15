const products = [
    {
        name: "phone",
        prize: 299
    },
    {
        name: "pad",
        prize: 399
    }
];

const getProducts = async (ctx, next) => {
    console.log("GET API: /api/products");
    ctx.response.type = "application/json";
    ctx.response.body = {
        products: products
    }
};

const postProducts = async (ctx, next) => {
    console.log("POST API: /api/products");
    const {name, prize} = ctx.request.body;
    const res = {name, prize};
    products.push(res);
    ctx.response.type = "application/json";
    ctx.response.body = res;
};

module.exports = {
    "GET /api/products": getProducts,
    "POST /api/products": postProducts
};