// ps:使用之前请先阅读README.md文件
//
/****************************定义和引入********************************/
// 引入模块
var app = require('express')();
var bodyParser = require("body-parser");
var proxy = require('express-http-proxy');
var Mock = require('mockjs')
var host = 'http://localhost:';

/*************************以下为设置和启用*****************************/
// 设置node服务
app.set('port', 8888);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use('/proxy', proxy('localhost:9999', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

// 启动服务
app.listen(app.get('port'), function() {
  console.log("服务已经启动，APIhost：" + host + app.get('port'));
});

/******************以下为此服务支持跨域请求********************/
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
  // res.set({
  //   'Content-Type': 'Content-Type:application/json; charset=UTF-8',
  // })
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

/******************以下是api部分***********************/


// mock数据示例
app.get('/goods/brand', function(req, res) {
  var data = Mock.mock(["鹰牌","维他","盒装","瓶装","特意浓","汇源","正宗","易购","恒大冰泉","宝矿力水特宝矿力水特","友芝友","光明畅优果粒"])
  res.send(JSON.stringify(data))
  console.log('goodsbrand')
})

