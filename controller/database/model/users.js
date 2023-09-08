const { sequelize, DataTypes } = require('../index')

const RoleModel = require("./roles")

const UserModel = sequelize.define("users", {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    role_id: {
        type: DataTypes.UUID,
        references: {
            model: 'roles',
            key: 'role_id'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    profile_photo: {
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

UserModel.hasOne(RoleModel, {
    foreignKey: 'role_id'
})



module.exports = UserModel