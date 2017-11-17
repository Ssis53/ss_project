var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var ManageModel = require('../model/ManageModel')

/* GET home page. */
router.post('/', function(req, res, next) {
  //todo
  //处理上传过来的图片
  //生成multiparty对象，并配置上传目标路径
  var myPicName = '';
  let positionName;
  let company;
  let exer;
  let position;
  let where;
  let offer;
    var form = new multiparty.Form({uploadDir: './public/images/'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
      var filesTmp = JSON.stringify(files,null,2);


    // 取到字符串信息

    positionName = fields.positionName[0];
    company = fields.company[0];
    exer = fields.exer[0];
    position = fields.position[0];
    where = fields.where[0];
    offer = fields.offer[0];

    //处理图片
      if(err){
        console.log('parse error: ' + err);
      } else {
        console.log('parse files: ' + filesTmp);
        var inputFile = files.inputFile[0];
        var uploadedPath = inputFile.path;
        var newName = uploadedPath.slice((uploadedPath.lastIndexOf('\\') + 1));
        var dstPath = '/Sshomework/week/myshop/public/images/' + inputFile.originalFilename;
        myPicName = '/images/' + inputFile.originalFilename;
        // 重命名为真实文件名
        fs.rename(uploadedPath, dstPath, function(err) {
          if(err){
            console.log('rename error: ' + err);
          } else {
            console.log('rename ok');
          }
        });

        // res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        // res.write('received upload:\n\n');
        // res.end(util.inspect({fields: fields, files: filesTmp}));
        // console.log(`${myPicName},${positionName},${company},${exer},${position},${where},${offer}`);

        //    取得了前端添加的数据，插入数据库
           var managemodel = new ManageModel();
           managemodel.logoSrc = myPicName;
           managemodel.positionName = positionName;
           managemodel.company = company;
           managemodel.exer = exer;
           managemodel.position = position;
           managemodel.where = where;
           managemodel.offer = offer;
           managemodel.flag = 1;
           managemodel.save((err) => {
               if(err) {
                   res.send('添加失败，发生未知错误')
                   return;
               }
               res.redirect('/manage');
            //    ManageModel.find({flag: 1}, (err, result) => {
            //      if (err || result <= 0) {
            //        res.render('manage', { title: '管理页面', list: [] });
            //        return;
            //      }
            //        res.render('manage', { title: '管理页面', list: result});
            //    })
           })
     }

   });


});


router.post('/save', function(req, res, next) {
    //todo
    //todo
    //处理上传过来的图片
    //生成multiparty对象，并配置上传目标路径
    var myPicName = '';
    let positionName;
    let company;
    let exer;
    let position;
    let where;
    let offer;
    let id;
      var form = new multiparty.Form({uploadDir: './public/images/'});
      //上传完成后处理
      form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);


      // 取到字符串信息

      positionName = fields.positionNameEdit[0];
      company = fields.companyEdit[0];
      exer = fields.exerEdit[0];
      position = fields.positionEdit[0];
      where = fields.whereEdit[0];
      offer = fields.offerEdit[0];
      id = fields.idEdit[0];

      //处理图片
        if(err){
          console.log('parse error: ' + err);
        } else {
          console.log('parse files: ' + filesTmp);
          console.log(JSON.stringify(fields));
          var inputFile = files.inputFileEdit[0];
          var uploadedPath = inputFile.path;
          var newName = uploadedPath.slice((uploadedPath.lastIndexOf('\\') + 1));
          var dstPath = '/Sshomework/week/myshop/public/images/' + inputFile.originalFilename;
          myPicName = '/images/' + inputFile.originalFilename;
          // 重命名为真实文件名
          fs.rename(uploadedPath, dstPath, function(err) {
            if(err){
              console.log('rename error: ' + err);
            } else {
              console.log('rename ok');
            }
          });
          console.log(`${myPicName},${positionName},${company},${exer},${position},${where},${offer}`);
        //   res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        //   res.write('received upload:\n\n');
        //   res.end(util.inspect({fields: fields, files: filesTmp}));


          //    取得了前端添加的数据，修改数据库
            ManageModel.update({_id: id}, {logoSrc: myPicName, positionName: positionName, company: company, exer: exer, position: position, where: where, offer: offer}, (err) => {
                if(err) {
                    res.send({
                        ret: false
                    });
                    return;
                }
                res.send({
                    ret: true
                });
            });
             
       }

     });
})
module.exports = router;
