var express = require('express');
var router = express.Router();
var UserModel = require('../model/UserModel');

// /* GET users listing. */
// // router.get('/', function(req, res, next) {
// //   res.redirect('/register');
// // });

router.post('/register', function(req, res, next) {
  //连接数据库存入用户
  var usermodel = new UserModel();
  var back = {
      ret: false,
      reason: ''
  }
  UserModel.find({username: req.body.username}, (err, result) => {
      if(err || result.length > 0) {
          back['ret'] = 'repeat';
          back['reason'] = '该帐号已被注册';
          res.send(back);
          return;
      }
      usermodel.username = req.body.username;
      usermodel.password = req.body.password;
      usermodel.email = req.body.email;
      usermodel.save((err) => {
          if(err) {
              back['ret'] = false;
              back['reason'] = '帐号或密码错误';
              res.send(back);
          } else {
              back['ret'] = true;
              res.send(back)
          }
      })
  })
});


router.post('/login', function(req, res, next) {
  //连接数据库查找
  UserModel.find({username: req.body.username, password: req.body.password}, (err, result) => {
      if(err || result.length <= 0) {
          res.send(
              {
                  ret: false
              }
          )
          return;
      }
      req.session.user = req.body.username;
      res.send({
          ret: true
      })

  })
});


router.post('/checkStates', function(req, res, next) {
    if (req.body.user === req.session.user) {
        res.send({
            ret: true
        });
    } else {
        res.send({
            ret: false
        })
    }

});

module.exports = router;
