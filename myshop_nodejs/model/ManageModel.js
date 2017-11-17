var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Job = new Schema({
    logoSrc: String,
    positionName: String,
    company: String,
    exer: String,
    position: String,
    where: String,
    offer: String,
    flag: Number,
    date: { type: Date, default: Date.now }
});

var ManageModel = mongoose.model('company', Job);

module.exports = ManageModel;
