const Koa = require("koa");

const app = new Koa();

// middleware
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url}`);
    await next(); // 如果不调用next()，则后面的middleware不会执行
});

// middleware
app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms}ms`);
});

// middleware
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = "text/html";
    ctx.response.body = "<h1>Hello, Koa2.</h1>";
});

app.listen(3000);

console.log("app started at port 3000...");
