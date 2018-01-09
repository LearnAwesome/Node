const model = require("./model");

(async () => {

    const initDB = await model.sync();

    console.log(`Init db successed...`);

    process.exit(0);

})();