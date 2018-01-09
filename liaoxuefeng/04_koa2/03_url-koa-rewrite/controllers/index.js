class Index {

    constructor() {
        return {
            "GET /": this._get,
            "POST /login": this._post
        };
    }

    async _get(ctx, next) {
        ctx.response.body = `
            <h1>HOME</h1>
            <form method="post" action="/login">
                <p><input name="username" type="text" value="koa"></p>
                <p><input name="password" type="password"></p>
                <p><input type="submit" value="Submit"></p>
            </form>
        `;
    }

    async _post(ctx, next) {
        const { username = "", password = "" } = ctx.request.body;
        if (username === "koa" && password === "123456" ) {
            ctx.response.body = "<h1>Login Successed!</h1>";
        } else {
            ctx.response.body = `<h1>Login Failed</h1><a href="/">Try Again</a>`;
        }
    }

}

module.exports = new Index();