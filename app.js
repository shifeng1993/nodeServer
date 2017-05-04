// ps:使用之前请先阅读README.md文件
//
/****************************定义和引入********************************/
// 引入模块
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var superagent = require('superagent'); //http://visionmedia.github.io/superagent/#response-properties 文档地址
var server = http.Server(app);
var host = 'http://localhost:';
var port = 9999; //设置本地转发服务端口
var Mock = require('mockjs')

/*************************以下为设置和启用*****************************/
// 设置node服务
app.set('port', port);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// 启动服务
server.listen(app.get('port'), function() {
  console.log("服务已经启动，APIhost：" + host + port);
});

/******************以下为此服务支持跨域请求********************/
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
  res.set({
    'Content-Type': 'Content-Type:application/json; charset=UTF-8',
  })
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

/******************以下是api公共部分，不用修改***********************/
// form 请求
var form = function(req, res, API, log) {
  var sreq = superagent.post(dbUrl + API);
  sreq.type('form')
  sreq.send(req.body);
  sreq.pipe(res);
  sreq.on('end', function() {
    console.log(log);
  });
}

// json 请求
var json = function(req, res, API, log) {
  var sreq = superagent.post(dbUrl + API);
  sreq.type('json')
  sreq.send(req.body);
  sreq.pipe(res);
  sreq.on('end', function() {
    console.log(log);
  });
}

/******************以下是api私有部分，必须修改***********************/

// 设置后端服务器url
var dbUrl = 'http://test.com'; //这里写你的后端api地址

//需配置部分
// app.get('这里写node服务接受前端发送参数的地址', function(req, res) {
//   var API = '这里写后端java公共api，当然你们后端是什么的随意，，这里只是举个例子。'
//   var log = '这里写node服务输出logs';
//   form(req, res, API, log)
// });

//以下是不同请求发送方式

// form请求示例
app.get('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  form(req, res, API, log)
});

app.post('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  form(req, res, API, log)
});

app.put('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  form(req, res, API, log)
});

app.patch('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  form(req, res, API, log)
});

app.delete('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  form(req, res, API, log)
});

// json请求示例
app.get('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  json(req, res, API, log)
});

app.post('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  json(req, res, API, log)
});

app.put('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  json(req, res, API, log)
});

app.patch('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  json(req, res, API, log)
});

app.delete('/api/machine/init', function(req, res) {
  var API = '/api/v2/machine/init'
  var log = '初始化机器';
  json(req, res, API, log)
});

// mock数据示例
app.get('/goods/brand', function(req, res) {
  var data = Mock.mock(["鹰牌","维他","盒装","瓶装","特意浓","汇源","正宗","易购","恒大冰泉","宝矿力水特宝矿力水特","友芝友","光明畅优果粒"])
  res.send(JSON.stringify(data))
  console.log('goodsbrand')
})

