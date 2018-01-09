const db = require('../db');

const pets = db.defineModel('pets', {
    ownerId: db.ID,
    name: db.STRING(100),
    gender: db.BOOLEAN,
    birth: db.STRING(10),
});

module.exports = pets;