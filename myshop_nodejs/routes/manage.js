var express = require('express');
var router = express.Router();
var ManageModel= require('../model/ManageModel');
var perPageCount = 3;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user) {
      //取到数据库现有的数据
      ManageModel.find({flag: 1}, (err, result) => {
          if (err || result <= 0) {
            res.render('manage', { title: '管理页面', list: [] });
            return;
          }
          var pageNo = req.query.pageNo? req.query.pageNo: 1;
            //返回定量的数据
            var pageList = result.slice((pageNo - 1) * perPageCount, (pageNo - 1) * perPageCount + perPageCount);
            res.render('manage', { title: '管理页面', list: pageList, pageNoNow: pageNo});
      })
  } else {
      res.redirect('/');
  }
});

//删除数据
router.get('/remove', function(req, res, next) {
    var id = req.query.id;
    ManageModel.update({_id: id}, {flag: 0}, (err) => {
        if(err){
            res.send('删除失败')
            return;
        }
        res.redirect('/manage');
    })
});

//编辑
router.post('/edit', function(req, res, next) {
    var id = req.body.id;
    ManageModel.find({_id: id}, (err, result) => {
        console.log(`${result[0].logoSrc},${result[0].positionName},${result[0].company},${result[0].exer},${result[0].position},${result[0].where},${result[0].offer}`)
        var ret = {
            logoSrc: result[0].logoSrc,
            positionName: result[0].positionName,
            company: result[0].company,
            exer: result[0].exer,
            position: result[0].position,
            where: result[0].where,
            offer: result[0].offer
        }
        res.send(JSON.stringify(ret));
    })
})

module.exports = router;
