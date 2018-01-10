const initEnv = require("./env");
const {Pets, User} = require('./model');

initEnv("test");

console.log( process.env.NODE_ENV );

(async () => {
    var user = await User.create({
        name: 'John',
        gender: false,
        email: 'john-' + Date.now() + '@garfield.pet',
        passwd: 'hahaha'
    });
    // console.log('created: ' + JSON.stringify(user));
    // var cat = await Pets.create({
    //     ownerId: user.id,
    //     name: 'Garfield',
    //     gender: false,
    //     birth: '2007-07-07',
    // });
    // console.log('created: ' + JSON.stringify(cat));
    // var dog = await Pets.create({
    //     ownerId: user.id,
    //     name: 'Odie',
    //     gender: false,
    //     birth: '2008-08-08',
    // });
    // console.log('created: ' + JSON.stringify(dog));
    process.exit(0);
})();