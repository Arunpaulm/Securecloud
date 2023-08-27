const { sequelize, DataTypes } = require('../index')

const users = require("./users")

const AntiVirusModel = sequelize.define("antivirus", {
    av_id: {
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
    avfile_id: {
        type: DataTypes.STRING
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING
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

users.hasMany(AntiVirusModel)

module.exports = AntiVirusModel