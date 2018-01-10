const model = require("./model");

console.log(process.env.NODE_ENV);

(async () => {

    const initDB = await model.sync();

    console.log(`Init db successed...`);

    process.exit(0);

})();