const Nunjucks = require("nunjucks");
const pathTool = require("path");

const initEnv = (path, opts) => {
    const {
        autoescape = true,
        noCache = true,
        watch = false,
        throwOnUndefined = false
    } = opts;
    const env = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader(path, {
            watch, throwOnUndefined
        }), {autoescape, noCache}
    );
    if (opts.filter) {
        Object.keys(opts.filter).forEach(key => {
            env.addFilter(key, opts.filter[key]);
        });
    }
    return env;
}

const initTemplate = (path = "/views", opts = {}) => {
    path = pathTool.join(__dirname, path);
    const env = initEnv(path, opts);
    return async (ctx, next) => {
        ctx.render = (view, model) => {
            ctx.response.type = "text/html";
            ctx.response.body = env.render(view, Object.assign(
                {},
                ctx.status || {},
                model || {}
            ));
        }
        await next();
    }
}

module.exports = initTemplate;