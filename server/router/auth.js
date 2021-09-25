const express = require('express');
const crypt = require('../utils/crypt.js');
const auth = require('../utils/auth.js');
const router = express.Router();
const User = require('../models/user.js');

router.post('/login', async (req, res) => {
s
    const {username, password} = req.body;
    //get users password from the database
    console.log(`[*] Username : ${username} Password: ${password}`);

    const user = await User.findOne({"username": username}).exec().then()
    if(!user){
        return res.status(404).json({
            "message": "User not found"
        });
    }
    

    let valid = await crypt.checkPassword(user.passwordHash, password)
    if (!valid){
        return res.status(401).json({
            "messsage": "Authentication failed",
        });
    }

    let token = auth.generateToken(user.username, user.isAdmin, user._id);
    return res.status(200).json({
        "token": token,
    });
});

router.get('/refresh', auth.authMiddleware, (req, res) => {
    let token = auth.generateToken(user.username, user.isAdmin, user._id);
    return res.status(200).json({
        "token": token,
    });
});

router.get('/me', auth.authMiddleware, (req, res) => {
    if (req.username == null){
        return res.status(500).json({
            "error": "username not set in context",
        });
    }

    if(req.userID == null){
        return res.status(500).json({
            "error": "userID not set in context",
        });
    }
    
    return res.status({
        "id": req.userID,
        "username": req.username,
    });
});

module.exports = router;