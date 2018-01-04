const Koa = require("koa");
const bodyParser = require("koa-bodyparser"); //解析body内容
const controller = require("./controller");

const app = new Koa();

// 先挂载body解析器
app.use( bodyParser() );

// 再挂载路由
app.use( controller() );

app.listen(3000);

console.log(`Server is running at port:3000...`);