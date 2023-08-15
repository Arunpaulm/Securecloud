require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    '',
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

function dbConnect() {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
}

module.exports = { dbConnect, sequelize, Sequelize, DataTypes }