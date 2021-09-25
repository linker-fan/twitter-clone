const mongoose = require('mongoose');
const schema = mongoose.Schema({
    tweet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    created: Date,
    updated: Date,
});

module.exports = mongoose.model("Comment", schema);