const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    passwordHash: String,
    created: String,
    updated: String
});

module.exports = mongoose.model("User", schema);
