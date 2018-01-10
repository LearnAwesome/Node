const Sequelize = require("sequelize");
const uuid = require("uuid");
const config = require("./config");

const exp = {}; // exports临时对象

const ID_TYPE = Sequelize.STRING(50); // id类型

// 实例化Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool
});

// 获取uuid
const generateId = () => {
    return uuid.v4();
};

// 规范字段
const defineModel = (name, keys) => {
    const _ATTRS = {}; // 新增字段临时储存对象
    Object.keys(keys).forEach(key => {
        const value = keys[key]; // 新增字段的value值

        /**
         * value的值大致有这两种情况
         * email: {
                type: db.STRING(100),
                unique: true
            },
         * passwd: db.STRING(100)
         */

        // 加入非空约束 allowNull
        if (typeof value === "object" && value.type) { // 如果新增字段的value值中已经定义了type
            value.allowNull = value.allowNull || false; // 非空约束
            _ATTRS[key] = value; // 复制
        } else {
            _ATTRS[key] = {
                type: value,
                allowNull: false
            };
        }

    });

    // 默认字段
    const _DEFAULT = {
        id: {
            type: ID_TYPE,
            primaryKey: true
        },
        createAt: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        updateAt: {
            type: Sequelize.BIGINT,
            allowNull: false
        },
        version: {
            type: Sequelize.BIGINT,
            allowNull: false
        }
    };
    Object.assign(_ATTRS, _DEFAULT); // 合并默认字段

    // 返回一个可以用于Table操作( findAll() / create() / save() / destroy() )的对象
    return sequelize.define(name, _ATTRS, {
        tableName: name, // 表名
        timestamps: false, // 关闭时间戳
        hooks: { // 钩子函数
            beforeValidate(obj) { // 数据进入table之前
                const now = Date.now();
                if (obj.isNewRecord) { // 是否为新增数据
                    console.log('will create entity...' + obj);
                    if (!obj.id) { // 是否已经携带id字段
                        obj.id = generateId();
                    }
                    obj.createAt = now;
                    obj.updateAt = now;
                    obj.version = 0;
                } else {
                    console.log('will update entity...');
                    object.updateAt = now;
                    obj.version ++;
                }
            }
        }
    });
};

// 用于自动建表的函数
const sync = () => {
    if (process.env.NODE_ENV !== "production") { // 非生产环境才能使用自动建表
        return sequelize.sync({ force: true });
    } else {
        throw new Error(`Environment ERROR: Cannot sync() when NODE_ENV is set to 'production'.`);
    }
};

// 导出Sequelize数据类型
const TYPES = ["STRING", "INTEGER", "BIGINT", "TEXT", "BOOLEAN", "DOUBLE", "DATEONLY"];
TYPES.forEach(t => {
    exp[t] = Sequelize[t];
});

// 导出对象集合处理
Object.assign(exp, {
    ID: ID_TYPE,
    generateId,
    defineModel,
    sync
});

module.exports = exp;