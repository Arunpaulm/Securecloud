const { sequelize, DataTypes } = require('../index')

const UserModel = require('./users')

const RoleModel = sequelize.define("roles", {
    role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: "Customer",
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

RoleModel.belongsTo(UserModel, {
    foreignKey: 'role_id'
});

module.exports = RoleModel 