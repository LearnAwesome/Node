class Test1 extends require("./class") {
    constructor() {
        super();
        this.name = "John";
    }
    test() {
        console.log(this.constructor);
    }
}

const app = new Test1();

app.sayName();