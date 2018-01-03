"use strict";

const http = require("http");
const port = 8000;

// http.createServer( (request, response) => {} ) 创建服务器
const server = http.createServer((request, response) => {
    // request.method 方法
    // request.url 地址
    console.log( request.method + `:` + request.url );
    // response.writeHead(status, headObject);
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    // response.end(content) 成功后的返回
    response.end("<h1>hello, myServer</h1>");
});

// server.listen(port) 设置端口
server.listen(port);

console.log(`Server is running at http://127.0.0.1:${port}/`);