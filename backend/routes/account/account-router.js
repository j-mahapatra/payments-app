const express = require('express');
const { transferSchema } = require('../../utils/zod-schema');
const Account = require('../../models/account-model');
const authMiddleware = require('../../middlewares/auth-middleware');

const router = express.Router();

router.post('/transfer', async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();

        const { amount, receiver } = req.body;

        const { success } = transferSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ message: 'Invalid inputs.' });
        }

        const senderAccount = await Account.findOne({ userId: req.userId });

        if (!senderAccount || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Insufficient funds.' });
        }

        const receiverAccount = await Account.findOne({ userId: receiver });

        if (!receiverAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Invalid Receiver.' });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: receiver }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();

        return res.status(201).json({ message: 'Funds transferred successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
})

router.get('/account-details', authMiddleware, async (req, res) => {
    try {
        const userId = req?.userId ?? '';

        const account = await Account.findOne({ userId }).select('-__v');

        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        return res.status(200).json({ account });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }
})

module.exports = router;