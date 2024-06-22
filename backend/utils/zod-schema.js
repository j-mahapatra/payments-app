const zod = require('zod');

const signupSchema = zod.object({
    userName: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const signinSchema = zod.object({
    userName: zod.string(),
    password: zod.string(),
})


module.exports = { signupSchema, signinSchema };