const { z } = require("zod")

const createUsersSchema = z.object({
    username: z.string({
        required_error: "username is required",
    }).min(2, "Username should have min 2 characters").max(18, "Username should have max 2 characters"),
    password: z.string({
        required_error: "password is required",
    }).min(8, "Password should have min 8 characters"),
    email: z.string({
        required_error: "email is required",
    }).email("Invalid email").min(8, "Email should have min 8 characters"),
    phone: z.string().min(10, "phonenumber should have min 10 numbers").max(14, "phonenumber must have max 14 numbers").optional(),
    type: z.string().optional(),
    is_active: z.boolean().optional(),
    profile_photo: z.string().optional()
})

const updateUsersSchema = z.object({
    username: z.string().min(1).max(18).optional(),
    password: z.string().optional(),
    email: z.string().email().min(1).optional(),
    phone: z.string().min(10, "phonenumber should have min 10 numbers").max(14, "phonenumber must have max 14 numbers").optional(),
    type: z.string().optional(),
    is_active: z.boolean().optional(),
    profile_photo: z.string().optional()
})
    .partial()

module.exports = {
    createUsersSchema, updateUsersSchema
}