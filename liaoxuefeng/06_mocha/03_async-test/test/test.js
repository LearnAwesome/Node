const assert = require("assert");
const app = require("../app");

describe("#app.js", () => {

    it("#test async expression should return 15", async () => {

        const res = await app();

        assert.strictEqual(res, 15);

    });

});