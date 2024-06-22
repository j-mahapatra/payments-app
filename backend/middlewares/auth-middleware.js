const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')?.[1];

    if(!authHeader || !authHeader.startsWith('Bearer ') || !token) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (decodedToken.userId) {
            req.userId = decodedToken.userId;
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized access.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error.' });
    }

}

module.exports = authMiddleware;