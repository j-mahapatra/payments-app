const express = require('express');
const userRouter = express.Router();
const zod = require('zod');
const User = require('../../models/user-model');
const jwt = require('jsonwebtoken');

const signupSchema = zod.object({
    userName: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})


userRouter.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: 'Invalid inputs.' })
    }

    const user = User.findOne({
        userName: body.userName
    })

    if (user._id) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    const createdUser = await User.create(body);

    const token = jwt.sign({
        userId: createdUser._id
   }, process.env.JWT_SECRET);

    return res.status(201).json({ message: 'User created successfully.', token });
})

module.exports = userRouter;