var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    username: String,
    password: String,
    email: String,
    date: { type: Date, default: Date.now }
});

var UserModel = mongoose.model('member', Users);

module.exports = UserModel;
