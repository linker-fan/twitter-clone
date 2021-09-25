const express = require('express');
const auth = require('../utils/auth.js');
const Tweet = require('../models/tweet.js');
const router = express.Router();

router.post('/', auth.authMiddleware, (req, res) => {
    const content = req.body;

    let dn = Date.now().toString();
    let newTweet = new Tweet({
        user: req.userID,
        content: content,
        created: dn,
        updated: dn,
        likes: [],
    });

    newTweet.save(function(err, t){
        if (err){
            return res.status(500),json({
                "error": err,
            });
        }

        return res.statusCode(201);
    })
});


module.exports = router;