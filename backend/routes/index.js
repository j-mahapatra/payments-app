const express = require('express');
const userRouter = require('./user/user-router');
const accountRouter = require('./account/account-router');

const router = express.Router();

router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports = router;