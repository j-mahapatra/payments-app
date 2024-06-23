const express = require('express');
const userRouter = require('./user/user-router');
const accountRouter = require('./account/account-router');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

router.use('/user', userRouter);
router.use('/account', authMiddleware, accountRouter);

module.exports = router;