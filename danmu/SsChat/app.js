var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');





server.listen(80, (err) => {
    if(err) {
        console.log('服务器启动失败');
        return;
    }
    console.log('服务器启动成功');
});
app.use(express.static(path.join(__dirname, 'lib')));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('有用户连接上了')
  io.emit('news', `用户：${socket} 上线`);
  socket.on('chat', function (data) {
    //向所有人广播
    io.emit('toall', data);
  });


});
