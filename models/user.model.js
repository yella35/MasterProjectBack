const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    mail: String,
    password: String,
    salt:  String,
    name: String,
    firstName: String
});
module.exports.User = mongoose.model('User', User)