const UserModel = require('../database/model/users')
const bcrypt = require('bcrypt')

const {
    createUsersSchema
} = require("../database/schema/users");

const saltRounds = bcrypt.genSaltSync(10);

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 201 failed 500
 */
async function createUser(req, res) {
    try {
        console.log(" create user ")
        const { username, password, email, phone, type = "client", is_active = true, profile_photo } = req.body;

        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = await UserModel.create({
            username,
            password: passwordHash,
            email,
            phone,
            type,
            is_active,
            profile_photo
        });
        console.log("here user - ", user)
        res.status(201).json({
            status: true,
            data: {
                user,
            },
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: false,
                message: "User already exist",
            });
        }

        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 200 failed 500
 */
async function updateUser(req, res) {
    try {
        console.log(" update user ")

        console.log("update body -", req.body)

        if (!req.params?.user_id) {
            return res.status(500).json({
                status: false,
                message: "id cannot be empty or invalid id",
            });
        }

        const { password } = req.body;

        if (password) {
            const passwordHash = await bcrypt.hash(password, saltRounds)
            req.body.password = passwordHash
        }

        const result = await UserModel.update(
            { ...req.body, updatedAt: Date.now() },
            {
                where: {
                    user_id: req.body.user_id || req.params.user_id,
                },
            }
        );

        if (result[0] === 0) {
            return res.status(404).json({
                status: false,
                message: "User ID not found",
            });
        }

        const user = await UserModel.findByPk(req.params.user_id);
        console.log(" update user success")
        res.status(200).json({
            status: true,
            data: {
                user,
            },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 200 failed 500
 */
async function getOneUser(req, res) {
    try {
        console.log(" get one user ")
        console.log(req.params)
        if (!req.params?.user_id) {
            return res.status(500).json({
                status: false,
                message: "id cannot be empty or invalid id",
            });
        }

        const user = await UserModel.findByPk(req.params.user_id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User details not found",
            });
        }

        res.status(200).json({
            status: true,
            data: { user },
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 200 failed 500
 */
async function authUser(req, res) {
    try {
        console.log(" authUser user ")
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                error: "Invalid credentials"
            });
        }

        const [user] = await UserModel.findAll({ where: { email } });

        let isValidUser = false

        if (user?.password) {
            isValidUser = await bcrypt.compare(password, user?.password)

            delete user.password
            delete user.phone
            // delete user.type
            delete user.profile_photo
            delete user.createdAt
            delete user.updatedAt
        }


        if (isValidUser) {
            res.status(200).json({
                status: true,
                message: "username found",
                user
            });
        } else {
            res.status(401).json({
                status: false,
                error: "Invalid credentials"
            });
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 200 failed 500
 */
async function getAllUsers(req, res) {
    try {
        console.log(" getall user ")
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const skip = (page - 1) * limit;

        const users = await UserModel.findAll({ limit, offset: skip });

        res.status(200).json({
            status: true,
            length: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns success 201 failed 500
 */
async function deleteUser(req, res) {
    try {
        console.log(" delete user ")
        if (!req.params?.user_id) {
            return res.status(500).json({
                status: false,
                message: "id cannot be empty or invalid id",
            });
        }

        const user = await UserModel.findByPk(req.params.user_id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User details not found",
            });
        }

        const result = await UserModel.destroy({
            where: { user_id: req.params.user_id },
            force: true,
        });

        res.status(204).json({
            status: true,
            result,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = {
    createUser, updateUser, getOneUser, getAllUsers, deleteUser, authUser
}