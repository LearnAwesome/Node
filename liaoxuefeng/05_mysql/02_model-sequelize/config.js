const fs = require("fs");

const defaultConfig = "./config/config-default"; // 默认配置
const overrideConfig = "./config/config-override"; // 用于生产环境的配置(覆盖默认配置)
const testConfig = "./config/config-test"; // 测试配置

const initConfig = () => {

    console.log(process.env.NODE_ENV)

    let config = {}; // 临时配置对象
    if (process.env.NODE_ENV === "test") {
        console.log(`Load ${testConfig}...`);
        config = require(testConfig);
    } else {
        config = require(defaultConfig);
        console.log(`Load ${defaultConfig}...`);
        try {
            if ( fs.statSync(`${overrideConfig}.js`).isFile() ) {
                console.log(`Load ${overrideConfig}...`);
                Object.assign( config, require(overrideConfig) );
            }
        } catch (err) {
            console.log(`Cannot load ${overrideConfig}.`);
        }
    }
    return config;
};

module.exports = initConfig();