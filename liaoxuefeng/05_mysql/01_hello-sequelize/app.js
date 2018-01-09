const Sequelize = require("sequelize");
const config = require("./config");

// 实例化sequelize对象 { new Sequelize() }
const sequelize = new Sequelize(config.database, config.username, config.password, { // 数据库名称, 用户名, 密码
    host: config.host, // 地址
    dialect: config.dialect, // 数据库语言
    pool: config.pool
});

// 建立数据库table与sequelize模型的映射关系 { sequelize.define() }
const Pet = sequelize.define("pet", {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    timestamps: false // 时间戳
});

// 新增数据 { sequelizeModel.create() }
// (async () => {
//     const now = Date.now();
//     const dog = Pet.create({
//         id: `g-${now}`,
//         name: "NeedBeDestoried",
//         gender: false,
//         birth: "2018-08-08",
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log(`created. ${JSON.stringify(dog)}`);
// })();

// 查询数据 { sequelizeModel.findAll() } 返回 Array
(async () => {
    const pets = await Pet.findAll({
        where: {
            name: "Dian"
        }
    });
    console.log(`find ${pets.length} pets`);
    pets.forEach(item => {
        console.log( JSON.stringify(item) );
    });
    // for (let key of pets) {
    //     console.log(JSON.stringify(key));
    // }
})();

// 修改数据 { sequelizeModel.findAll() } -> { await target.save() }
// (async () => {
//     const pets = await Pet.findAll({
//         where: {
//             gender: false
//         }
//     });
//     if (pets.length > 0) {
//         const target = pets[0];
//         target.gender = true;
//         target.updatedAt = Date.now();
//         target.version ++;
//         await target.save();
//     }
// })();

// 删除数据 { sequelizeModel.findAll() } -> { await target.destroy() }
// (async () => {
//     const pets = await Pet.findAll({
//         where: {
//             name: "NeedBeDestoried"
//         }
//     });
//     if (pets.length > 0) {
//         const target = pets[0];
//         await target.destroy();
//     }
// })();