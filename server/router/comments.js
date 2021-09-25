const express = require('express');
const auth = require('../utils/auth.js');
const Comment = require('../models/comment.js');
const Tweet = require('../models/tweet.js');

const router = express.Router();

router.post('/:tweetID', auth.authMiddleware, async (req, res) => {
    const tweetID = req.params.tweetID;
    const tweetOID = await Tweet.findById(tweetID, {"_id": 1});
    if(!tweet){
        return res.statusCode(401);
    }
    let dn = Date.now().toString();

    let newComment = new Comment ({
        tweet: tweetOID,
        author: req.body.userID,
        content: req.body.content,
        created: dn,
        updated: dn
    });

    newComment.save(function(err){
        if(err){
            return res.status(500).json({
                "error": err,
            });
        }

        return res.statusCode(201);
    });
});

router.get('/:tweetID', auth.authMiddleware, async (req, res) => {
    const tweetID = req.params.tweetID;
    let comments = await Comment.findById(tweetID);
    return res.status(200).json({
        "comments": comments,
    });
});


module.exports = router;
