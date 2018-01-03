"use strict";

const path = require("path");

// path.resolve(".") 获取绝对路径
const workDir = path.resolve(".");
console.log(workDir); //c:\Users\MichaelLu\git\github.com\learn-node\liaoxuefeng\03_http

// path.join(path, folder, target) 拼接路径
const filePath = path.join(workDir, "pub", "index.html");
console.log(filePath); //c:\Users\MichaelLu\git\github.com\learn-node\liaoxuefeng\03_http\pub\index.html

console.log(process.argv[2])