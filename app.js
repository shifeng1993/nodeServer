/****************************定义和引入********************************/
// 引入模块
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var superagent = require('superagent'); //http://visionmedia.github.io/superagent/#response-properties 文档地址
var server = http.Server(app);
var dbUrl = 'http://test.open.com'; //这里写你的后端api地址

/****************************以下为设置和启用********************************/
// 设置node服务
app.set('port', 3333);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //启动中间件解析

// 启动服务
server.listen(app.get('port'), function(){
	console.log("服务已经启动，APIhost：http://127.0.0.1:3333/");
});

/******************以下为此服务支持跨域请求*********************不用动，返回数据头部均为json格式**/
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.set({
      'Content-Type':'Content-Type:application/json; charset=UTF-8',
  })
  if (req.method == 'OPTIONS') {
    res.send(200);
//     /让options请求快速返回/
  } else {
    next();
  }
});

/******************以下是api部分****************要修改的地方为前端发送的地址，和后端api实际地址 还有具体的req.type类型*******/
// form 示例
app.post('/api/facebook', function(req, res) {   //前端要发送的地址
  var sreq = superagent.post(dbUrl + '/facebook');  //后端实际api地址
  sreq.type('form')
  sreq.send(req.body);
  sreq.pipe(res);
  sreq.on('end', function() {
    console.log('后端成功打印log');
  });
});


// 
// json示例
app.post('/api/facebook', function(req, res) {   //前端要发送的地址
  var sreq = superagent.post(dbUrl + '/facebook');  //后端实际api地址
  sreq.type('json')   
  sreq.send(req.body);
  sreq.pipe(res);
  sreq.on('end', function() {
    console.log('后端成功打印log');
  });
});