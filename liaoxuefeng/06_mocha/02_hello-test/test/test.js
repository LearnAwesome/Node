const assert = require("assert");
const sum = require("../app");

describe("#app.js", () => { // 测试套件

    describe("#sum()", () => {

        /**
         * hooks
         * before() 测试套件开始
         * after() 测试套件结束
         * beforeEach() 测试用例开始
         * afterEach() 测试用例结束
         */

        before(() => {
            console.log("Before...");
        });
        after(() => {
            console.log("After...");
        });
        beforeEach(() => {
            console.log("   BeforeEach...");
        });
        afterEach(() => {
            console.log("   AfterEach...");
        });

        it("sum() should return 0", () => { // 测试用例
            assert.strictEqual(sum(), 0);
        });

        it("sum(1) should return 1", () => {
            assert.strictEqual(sum(1), 1);
        });

        it("sum(1, 2) should return 3", () => {
            assert.strictEqual(sum(1, 2), 3);
        });

        it("sum(1, 2, 3) should return 6", () => {
            assert.strictEqual(sum(1, 2, 3), 6);
        });

        it("sum(null) should return 0", () => {
            assert.strictEqual(sum(null), 0);
        });

    });

});

/**
 * 运行测试
 * 1 $ node_modules/mocha/bin/mocha
 * 2 package.json -> "scripts": { "test": "mocha" }
 * 3 
 */