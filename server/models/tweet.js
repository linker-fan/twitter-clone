const mongoose = require("mongoose");
const schema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    created: Date,
    updated: Date,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

module.exports = mongoose.model("Tweet", schema);
