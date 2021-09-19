const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET || "someTokenSecret123#$%";

const generateToken = (username, userID) => {
    return jwt.sign({username: username, id: userID}, tokenSecret, {expiresIn: '3600s'});
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, tokenSecret, (err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
};

module.exports = {
    generateToken,
    authMiddleware
}