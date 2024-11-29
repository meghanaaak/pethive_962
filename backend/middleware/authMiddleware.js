const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt; // Extract the token from cookies

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId; // Attach the decoded userId to the request
        next();
    } catch (err) {
        res.status(403).send({ message: 'Invalid or expired token.' });
    }
};
// const authorizeAdmin = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(403).send({ message: 'Forbidden: Admins only' });
//     }
//     next();
// };


module.exports =  authMiddleware ;

