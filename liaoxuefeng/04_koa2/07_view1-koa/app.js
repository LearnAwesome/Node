const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const staticManager = require("./static");
const templateManager = require("./template");
const controllerManager = require("./controller");

const app = new Koa();
const port = 3000;

app.use( bodyParser() );

app.use( staticManager() );

app.use( templateManager() );

app.use( controllerManager() );

app.listen(3000);

console.log(`Server is running at port:${port}...`);