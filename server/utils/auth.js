const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET || "someTokenSecret123#$%";

const generateToken = (username, userID) => {
    return jwt.sign({username: username, userID: userID}, tokenSecret, {expiresIn: '3600s'});
}

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, tokenSecret, (err,username, userID) => {
        if(err) return res.sendStatus(403);
        req.username = username;
        req.userID = userID;
        next();
    })
};

module.exports = {
    generateToken,
    authMiddleware
}