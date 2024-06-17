const express = require('express');
const userRouter = require('./user/user-router');
const router = express.Router();

router.get('/user', userRouter);

module.exports = router;