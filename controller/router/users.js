const router = require('express').Router()
const busboy = require('connect-busboy');
const { createUser, updateUser, getOneUser, getAllUsers, deleteUser, authUser } = require('../services/users')
const { createUsersSchema, updateUsersSchema } = require('../database/schema/users')
const validate = require('../middleware/validate')

router
    .route("/")
    .get(getAllUsers)
    .post(validate(createUsersSchema), createUser);

router
    .route("/auth")
    .post(authUser);

router
    .route("/:noteId")
    .get(getOneUser)
    .patch(validate(updateUsersSchema), updateUser)
    .delete(deleteUser);

module.exports = router
