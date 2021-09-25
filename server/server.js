const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const DATABASE_PORT = process.env.DATABASE_PORT || 27017;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || "root";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "password";
const DATABASE_HOST = process.env.DATABASE_HOST || "localhost"; 

mongoose.connect(`mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`, 
{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log(`[+] Connected to the database on port ${DATABASE_PORT}!`);
})
.catch(err => {
    console.log(err);
    return;
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/auth', require('./router/auth.js'));
app.use('/api/users', require('./router/users'));
app.use('/api/tweets', require('./router/tweets.js'));
app.use('/api/comments', require('./router/comments.js'));

app.listen(SERVER_PORT, () => { console.log(`Server running on port :${SERVER_PORT}`); });