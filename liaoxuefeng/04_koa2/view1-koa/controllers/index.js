const mapping = {
    "GET /": async (ctx, next) => {
        ctx.render("index.html", {
            title: "Index"
        });
    }
};

module.exports = mapping;