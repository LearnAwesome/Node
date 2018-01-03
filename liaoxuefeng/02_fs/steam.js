const fs = require("fs");


// read steam
// const rs = fs.createReadStream("test.json", "utf-8");

// rs.on("data", chunk => {
//     console.log("onData");
//     console.log(chunk);
// });

// rs.on("end", () => {
//     console.log("onEnd");
// });

// rs.on("error", err => {
//     console.log("onError");
//     console.log(err);
// });

// write steam
// const ws = fs.createWriteStream("output.txt", "utf-8");
// ws.write("使用writeSteam写入数据...\n");
// ws.write("END.");
// ws.end();

// pipe
const rs = fs.createReadStream("test.json", "utf-8");
const ws = fs.createWriteStream("output1.json", "utf-8");
rs.pipe(ws, {end: false}); //相当于克隆rs的文件到ws中