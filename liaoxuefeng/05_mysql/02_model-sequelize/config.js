const fs = require("fs");

const defaultConfig = "./config/config-default";
const overrideConfig = "./config/config-override";
const testConfig = "./config/config-test";

// console.log(process.env.NODE_ENV)

const initConfig = () => {
    let config = {};
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