const dbConfig = require('../config/db');
const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({ path: '.env' })

const dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    'port' : dbConfig.PORT,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
        try {
            sequelize.authenticate();
        console.log('connection reuissie.');
        } catch (error) {
        console.error('Connexion echouée:', error);
        }

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../models/user')(sequelize, Sequelize);
db.posts = require('../models/post')(sequelize, Sequelize);
db.likes = require('../models/likes')(sequelize, Sequelize);
db.comments = require('../models/comments')(sequelize, Sequelize);

db.users.hasMany(db.posts)
db.posts.belongsTo(db.users, {onDelete: "CASCADE",})

db.posts.hasMany(db.comments)
db.comments.belongsTo(db.posts, {onDelete: "CASCADE",})

db.users.hasMany(db.comments)
db.comments.belongsTo(db.users, {onDelete: "CASCADE",})

db.sequelize.sync();

module.exports = db;