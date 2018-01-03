const url = require("url");
const path = require("path");
const fs = require("fs");

const createReponse = function(request, response, plus) {
    plus = typeof(plus) === "string" ? plus : "";
    const pathname = url.parse(request.url).pathname;
    const filepath = path.join(root, pathname, plus);
    fs.stat(filepath, (err, stats) => {
        if ( stats.isDirectory() ) {
            const _path = path.join(filepath, "index.html");
            return createReponse(request, response, _path);
        }
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
}

module.exports = createReponse;