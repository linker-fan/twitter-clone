const mongoose = require("mongoose");
const schema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    created: Date,
    updated: Date,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
});

module.exports = mongoose.model("Tweet", schema);
