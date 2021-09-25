const express = require('express');
const emailValidator = require("email-validator");
const crypt = require('../utils/crypt.js');

const router = express.Router();
const User = require('../models/user.js');

router.post('/register', async (req, res) => {
    const {username, email, password1, password2 } = req.body;

    //validate input data
    if(!emailValidator.validate(email)){
        return res.status(400).json({
            "message": "Email not valid",
        });
    }

    if(password1 != password2){
        return res.status(400).json({
            "message": "Passwords not matching",
        });
    }

    let passwordHash = await crypt.generatePassswordHash(password1);
    let dn = Date.now().toString();
    let newUser = new User({
        username: username,
        email: email,
        passwordHash: passwordHash,
        confirmed: false,
        verified: false,
        created: dn,
        modified: dn
    });

    newUser.save(function(err, u){
        if(err){
            return res.statusCode(500);
        }
        return res.statusCode(201);
    });
});

module.exports = router;