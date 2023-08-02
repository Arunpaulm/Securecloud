const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

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

console.log('Initiating migration script');

const users = sequelize.define("users", {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: "client",
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    profile_photo: {
        type: DataTypes.STRING,
    }
});

const role = sequelize.define("role", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('users table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
