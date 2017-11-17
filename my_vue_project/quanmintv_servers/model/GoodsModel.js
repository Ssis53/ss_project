var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Goods = new Schema({
    goodsName    : String,
    goodsPrice     : String,
    username: String,
    count: Number,
    flag: {type: Number, default: 1},
    date: { type: Date, default: Date.now }
});

var GoodsModel = mongoose.model('goods', Goods);

module.exports = GoodsModel;
