const config = {
    database: "test",
    username: "www",
    password: "www",
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};

module.exports = config;