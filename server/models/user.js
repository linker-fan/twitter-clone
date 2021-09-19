const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username: String,
    email: String,
    passwordHash: String,
    created: String,
    updated: String
});

module.exports = mongoose.model("User", schema);