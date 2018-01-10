const db = require("../db");

const user = db.defineModel("user", {
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});

module.exports = user;