const Koa = require("koa");
const bodyParser = require("koa-bodyparser"); //解析body内容
const router = require("koa-router")();

const app = new Koa();

// 服务端渲染简单表单
router.get("/", (ctx, next) => {
    ctx.response.body = 
        `<h1>Index</h1>
        <form method="post" action="/login">
            <p>Username: <input name="name" type="text" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

// post表单内容
router.post("/login", (ctx, next) => {
    // 获取用户名 / 密码
    const {name = "", password = ""} = ctx.request.body;
    console.log(`Login with name: ${name} / password: ${password}`);
    // 用户名密码匹配验证
    if (name === "koa" && password === "123456") {
        ctx.response.body = `<h1>Login Successed!</h1>`;
    } else {
        ctx.response.body = 
            `<h1>Login failed</h1>
            <a href="/">Try Again</a>`;
    }
});

// 先挂载body解析器
app.use( bodyParser() );

// 再挂载路由
app.use( router.routes() );

app.listen(3000);

console.log(`Server is running at port:3000...`);