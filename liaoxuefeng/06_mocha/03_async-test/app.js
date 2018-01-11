const fs = require("mz/fs");

const initExp = async () => {
    const expression = await fs.readFile("./data.txt", "utf-8");
    const fn = new Function(`return ${expression}`);
    const res = fn();
    console.log(`    Calculate: ${expression} = ${res}`);
    return res;
}

module.exports = initExp;