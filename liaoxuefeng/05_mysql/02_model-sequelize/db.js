const Sequelize = require("sequelize");
const uuid = require("uuid");
const config = require("./config");

const generateId = () => {
    return uuid.v4();
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool
});

const ID_TYPE = Sequelize.STRING(50);

const defineModel = (name, keys) => {
    const _ATTRS = {};
    Object.keys(keys).forEach(key => {
        const value = keys[key];
        if (typeof value === "object" && value.type) {
            value.allowNull = value.allowNull || false;
            _ATTRS[key] = value;
        } else {
            _ATTRS[key] = {
                type: value,
                allowNull: false
            };
        }
    });
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
    Object.assign(_ATTRS, _DEFAULT);
    return sequelize.define(name, _ATTRS, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate(obj) {
                const now = Date.now();
                if (obj.isNewRecord) {
                    console.log('will create entity...' + obj);
                    if (!obj.id) {
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


const sync = () => {
    if (process.env.NODE_ENV !== "production") {
        return sequelize.sync({ false: true });
    } else {
        throw new Error(`Environment ERROR: Cannot sync() when NODE_ENV is set to 'production'.`);
    }
};

const TYPES = ["STRING", "INTEGER", "BIGINT", "TEXT", "BOOLEAN", "DOUBLE", "DATEONLY"];

const exp = {};
TYPES.forEach(t => {
    exp[t] = Sequelize[t];
});

Object.assign(exp, {
    ID: ID_TYPE,
    generateId,
    defineModel,
    sync
});

module.exports = exp;