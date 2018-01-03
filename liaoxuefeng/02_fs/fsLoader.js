const fs = require('fs');

// readFile async
// fs.readFile("test1.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         // utf-8 data
//         console.log(Buffer.from(data));
//         // Buffer data
//         console.log(data.toString("utf-8"));
//     }
// });

// fs.readFile("mellow.png", "utf-8", (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         // utf-8 data
//         fs.writeFile("mellow.txt", data);
//         console.log(data);
//         // console.log(Buffer.from(data));
//         // Buffer data
//         // console.log(data.toString("utf-8"));
//     }
// });

// readFile sync
// const res = fs.readFileSync("test.txt", "utf-8");
// console.log(res);

// writeFile
// const data = "hello, node";
// fs.writeFile("test1.txt", data, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// stat
// fs.stat("test.txt", (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log( data.isFile() );
//         console.log( data.isDirectory() );
//         console.log(data);
//     }
// });