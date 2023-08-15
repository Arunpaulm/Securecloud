const { z } = require("zod")

const createUsersSchema = z.object({
    username: z.string({
        required_error: "username is required",
    }).min(1).max(18),
    password: z.string({
        required_error: "password is required",
    }).min(8),
    email: z.string({
        required_error: "email is required",
    }).min(1),
    phone: z.string().optional(),
    type: z.string().optional(),
    is_active: z.boolean().optional(),
    profile_photo: z.string().optional()
})

const updateUsersSchema = z.object({
    username: z.string().min(1).max(18).optional(),
    password: z.string().min(8).optional(),
    email: z.string().min(1).optional(),
    phone: z.string().optional(),
    type: z.string().optional(),
    is_active: z.boolean().optional(),
    profile_photo: z.string().optional()
})
    .partial()

module.exports = {
    createUsersSchema, updateUsersSchema
}