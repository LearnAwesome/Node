const nunjucks = require("nunjucks");

// 模板环境处理器
const createEnv = (path, opts) => {

    // 参数预处理
    const {
        autoescape = true, // 危险字符过滤
        noCache = false, // 是否禁用缓存(开发环境禁用，可以查看实时更改)
        watch = false, // 服务端渲染时，重载发生改变的模板
        throwOnUndefined = false // 当model层出现null/undefined时，抛出错误
    } = opts;

    // 环境构造
    // new nunjucks.Environment(loader, opts)
    // new nunjucks.FileSystemLoader(path, opts)
    const env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path, {
            noCache: noCache,
            watch: watch
        }),
        {
            autoescape: autoescape,
            throwOnUndefined: throwOnUndefined
        }
    );

    // 过滤条件处理
    // 模板中的过滤语法{{ model|filter }}
    if (opts.filters) {
        Object.keys(opts.filters).forEach(f => {
            env.addFilter(f, opts.filters[f]);
        });
    }
    return env;

};

const env = createEnv("views", {
    watch: true,
    filters: {
        shorten(str, len) {
            return str.slice(0, 5);
        }
    }
});

const s = env.render("hello.html", {
    name: "Michael.Lu"
});

console.log(s);