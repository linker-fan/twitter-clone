const express = require('express');
const crypt = require('../utils/crypt.js');
const router = express.Router();
const User = require('../models/user.js');


router.post('/login', (req, res) => {
    console.log("[*] Login route...");
    const {username, password} = req.body;
    //get users password from the database
    console.log(`[*] Username : ${username} Password: ${password}`);
    const user = await User.findOne({"username": username})
    if(user == null){
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

    token = auth.generateToken(user.username, user.isAdmin, user._id);
    return res.status(200).json({
        "token": token,
    });
});