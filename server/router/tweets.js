const express = require('express');
const auth = require('../utils/auth.js');
const Tweet = require('../models/tweet.js');
const router = express.Router();

// Creates a new tweet
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

    newTweet.save(function(err){
        if (err){
            return res.status(500).json({
                "error": err,
            });
        }

        return res.statusCode(201);
    })
});

// Deletes a tweet
router.delete('/:id', auth.authMiddleware, (req, res) => {
    Tweet.deleteOne({_id: req.params.id, user: req.userID}).then(function(){
        return res.statusCode(200)
    }).catch(function(err){
        return res.status(500).json({
            "error": err,
        })
    });
});


module.exports = router;