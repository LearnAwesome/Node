const Koa = require("koa");
const router = require("koa-router")();

const app = new Koa();

// middleware
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url}`);
    await next(); // 如果不调用next()，则后面的middleware不会执行
});

router.get("/hello/:name", async (ctx, next) => {
    const name = ctx.params.name;
    ctx.response.body = `<h1>${name}</h1>`;
});

router.get("/", async (ctx, next) => {
    ctx.response.body = `Index`;
});

app.listen(3000);

console.log("app started at port 3000...");
