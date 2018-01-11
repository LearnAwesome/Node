const request = require("supertest");
const app = require("../app");
const port = 4000;

describe("#app.js", () => {
    
    describe("#server", () => {

        const server = app.listen(port);

        it("#test GET /", async () => {

            /**
             * supertest(server)
             * .get 模拟GET方法
             * .expect 断言
             */
            const res = await request(server)
                .get("/")
                .expect("Content-Type", /text\/html/)
                .expect(200, "<h1>Hello, world!</h1>");

        });

        it("#test GET /path?name=Michael", async () => {

            const res = await request(server)
                .get("/path?name=Michael")
                .expect("Content-Type", /text\/html/)
                .expect(200, "<h1>Hello, Michael!</h1>");

        });

    });

    after(() => {
        process.exit(0);
    });

});