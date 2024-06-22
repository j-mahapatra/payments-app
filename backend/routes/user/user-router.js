const express = require('express');
const User = require('../../models/user-model');
const jwt = require('jsonwebtoken');
const { signupSchema, signinSchema } = require('../../utils/zod-schema');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({ message: 'Invalid inputs.' })
    }

    try {
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
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
})

router.post('/signin', async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);

    if (!success) {
        return res.status(400).json({ message: 'Invalid inputs.' });
    }

    try {
        const user = await User.findOne({
            userName: req.body.userName,
            password: req.body.password
        })
    
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
    
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
    
        return res.status(200).json({ message: 'User logged in successfully.', token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
})

module.exports = router;