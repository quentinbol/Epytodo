const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        res.status(401).json({ "msg": "No token, authorization denied" });
        return;
    }
    
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            res.status(401).json({ "msg": "Token is not valid" });
            return;
        }
        req.user = user;
        next();
    });
}