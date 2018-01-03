"use strict";

const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const root = path.resolve(process.argv[2] || ".");
const port = 8000;

console.log(`Static root dir: ${root}`);

const server = http.createServer((request, response) => {
    const pathname = url.parse(request.url).pathname;
    const filepath = path.join(root, pathname);
    fs.stat(filepath, (err, stats) => {
        if (!err && stats.isFile()) {
            console.log("200" + request.url);
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            fs.createReadStream(filepath).pipe(response);
        } else {
            console.log("404" + request.url);
            response.writeHead(404);
            response.end("404 Not Found");
        }
    });
});

server.listen(port);

console.log(`Server is running at http://127.0.0.1:${port}/`);