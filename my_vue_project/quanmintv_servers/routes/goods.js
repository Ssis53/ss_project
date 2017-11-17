var express = require('express');
var router = express.Router();
var GoodsModel = require('../model/GoodsModel');

/* GET home page. */
router.post('/add', function(req, res, next) {
    if(!req.session || !req.session.user) {
        res.send({
            ret: false,
            code: -700,
            msg: '还未登陆，请登录'
        })
        return;
    }
    //先查询该用户有没有重复的
    GoodsModel.find({flag: 1, username: req.session.user, goodsName: req.body.goodsName, goodsPrice: req.body.goodsPrice}, (err, result) => {
        if(result.length > 0) {
            // TODO: 有重复的，做修改count操作
            var nowCount = parseInt(result[0].count);
            var newCount = nowCount + 1;
            var id = result[0]._id;
            GoodsModel.update({_id: id}, {count: newCount}, (err) => {
                if(err) {
                    res.send({
                        ret: false,
                        code: -201
                    })
                    return;
                }
                res.send({
                    ret: true,
                    code: 201
                })
            })


            return;
        }
        //没有重复的，做添加操作
        var goodsmodel = new GoodsModel();
        goodsmodel.goodsName = req.session.user;
        goodsmodel.goodsPrice = req.body.goodsPrice;
        goodsmodel.username = req.body.username;
        goodsmodel.count = 1;
        goodsmodel.save((err) => {
            if(err) {
                res.send({
                    ret: false,
                    code: -200
                })
                return;
            }
            res.send({
                ret: true,
                code: 200
            })
        })
    })
});


router.post('/getGoods', function(req, res, next) {

    if(!req.session || !req.session.user) {
        res.send({
            ret: false,
            code: -700,
            msg: '还未登陆，请登录'
        })
        return;
    }
    GoodsModel.find({username: req.session.user, flag: 1}, (err, result) => {
        if(err || result == 0) {
            res.send({
                ret: false,
                code: -300
            })
            return;
        }
        res.send({
            ret: true,
            code: 300,
            result: result
        })
    })
})

router.post('/remove', function(req, res, next) {
    GoodsModel.update({_id: req.body.goodsId}, {flag: 0}, (err) => {
        if(err) {
            res.send({
                ret: false,
                code: -500
            })
            return;
        }
        res.send({
            ret: true,
            code: 500
        })
    })
})

module.exports = router;
