var express = require('express');
var router = express.Router();
var UserModel = require('../model/UserModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
    var username = req.body.username? req.body.username: null;
    var password = req.body.password? req.body.password: null;

    UserModel.find({username: username}, (err, result) => {
        if(err || result.length > 0) {
            res.send({
                ret: false,
                code: -2
            })
            return;
        }
        var usermodel = new UserModel();
        usermodel.username = username;
        usermodel.password = password;
        usermodel.save((err) => {
            if(err) {
                res.send({
                    ret: false,
                    code: -1
                })
                return;
            }
            res.send({
                ret: true,
                code: 1
            })
        })
    })



})

router.post('/login', function(req, res, next) {
    var username = req.body.username? req.body.username: null;
    var password = req.body.password? req.body.password: null;

    UserModel.find({username: username, password: password}, (err, result) => {
        if(err || result <= 0) {
            res.send({
                ret: false,
                code: -10
            });
            return;
        }
        req.session.user = username;
        res.send({
            ret: true,
            code: 10
        })
    })
});

router.get('/check', function(req, res, next) {
    if(req.session.user) {
        res.send({
            ret: true,
            code: 100
        })
    } else {
        res.send({
            ret: false,
            code: -100
        })
    }
});


router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.send({
        ret: true
    })
});

module.exports = router;
