// 服务端渲染简单表单
const get = (ctx, next) => {
    ctx.response.body = 
        `<h1>Index</h1>
        <form method="post" action="/login">
            <p>Username: <input name="name" type="text" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

// post表单内容
const post = (ctx, next) => {
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
};

module.exports = {
    "GET /": get,
    "POST /login": post
};