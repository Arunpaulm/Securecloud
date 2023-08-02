const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    '',
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});