const express = require('express');
const User = require('../../models/user-model');
const Account = require('../../models/account-model');
const jwt = require('jsonwebtoken');
const { signupSchema, signinSchema, updateUserSchema } = require('../../utils/zod-schema');
const { MINIMUM_BALANCE } = require('../../utils/constants');
const authMiddleware = require('../../middlewares/auth-middleware');

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

        const createdAccount = await Account.create({
            userId: createdUser._id,
            balance: MINIMUM_BALANCE
        })

        if (!createdAccount._id) {
            return res.status(500).json({ message: 'Account could not be created.' });
        }
    
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

router.get('/get-users', authMiddleware, async (req, res) => {
    try {
        const filter = req?.query?.filter ?? '';

        const users = await User.find({
            $or: [
                {
                    firstName: {
                        $regex: filter 
                    }
                },
                {
                    lastName: {
                        $regex: filter
                    }
                }
            ]
        })
        .select('-password -__v');

        if (!users) {
            return res.status(404).json({ message: 'No users found.' });
        }

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
})

router.post('/update', authMiddleware, async (req, res) => {
    try {
          const body = req.body;
          const { success } = updateUserSchema.safeParse(body);

          if (!success) {
            return res.status(400).json({ message: 'Invalid inputs.' });
          }

          await User.updateOne(body, {
            id: req.userId
          }) 

          return res.status(201).json({ message: 'User details updated successfully.' });
    } catch (error) {
          return res.status(500).json({ message: 'Internal Server Error.' });
    }  
})

module.exports = router;