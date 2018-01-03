process.nextTick(() => {
    console.log("nextTick callback.");
});
console.log("first call.");

//first call.
//nextTick callback.

process.on("exit", () => {
    console.log("process is ending.");
});

//process is ending.