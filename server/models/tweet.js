const mongoose = require("mongoose");
const schema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    created: Date,
    updated: Date,
    likes: Number,
});
module.exports = mongoose.model("Tweet", schema);
