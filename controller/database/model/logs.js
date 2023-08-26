const { sequelize, DataTypes } = require('../index')

const users = require("./users")

const logsModel = sequelize.define("logs", {
    log_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'user_id'
        }
    },
    file_id: {
        type: DataTypes.UUID
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    archivefileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING
    },
    encoding: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    action: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
});

users.hasMany(logsModel)

module.exports = logsModel