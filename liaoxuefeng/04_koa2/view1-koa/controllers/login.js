const mapping = {
    "POST /login": async (ctx, next) => {
        const {
            username = "",
            password = ""
        } = ctx.request.body;
        if ( username === "277133779@qq.com" && password === "123456" ) {
            ctx.render("login-successed.html", {
                title: "LoginSuccessed"
            });
        } else {
            ctx.render("login-failed.html", {
                title: "LoginFailed"
            });
        }
    }
};

module.exports = mapping;