const fs = require("fs");
const db = require("./db");
const pathTool = require("path");

const modelHandler = (path = "/models") => {
    const exp = {};
    const files = fs.readdirSync( pathTool.join(__dirname, path) );
    files.forEach(file => {
        if ( file.endsWith(".js") ) {
            console.log(`import model from file ${file}...`);
            const name = file.substring(0, file.length - 3);
            exp[name] = require( pathTool.join(__dirname, path, file) );
        }
    });
    exp.sync = db.sync;
    return exp;
};

module.exports = modelHandler();