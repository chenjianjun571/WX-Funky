/**
 * Created by chenjianjun on 16/6/23.
 */
var http = require('http');
var Config = require("../config.js");

var instance = null;

function BusProcessMrg() {};

exports.Instance = function() {
  if (instance == null) {
    instance = new BusProcessMrg();
  }
  return instance;
}

BusProcessMrg.prototype.post = function(path, body, cb)
{
  let bodyString = new Buffer(JSON.stringify(body));
  let headers = {
    'Content-Type': 'application/json',
    'Content-Length': bodyString.length
  };

  let options = {
    host: Config.BusApiAPIHost,
    port: Config.BusApiPort,
    path: path,
    method: "POST",
    headers: headers
  };

  let data = {
    success:false,
    message:"",
    data:[],
    code:404,
    count:0
  };

  let req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var chunks = "";
    res.on('data', function (chunk) {
      chunks+=chunk;
    });
    res.on('end', function() {
      if (res.statusCode != 200) {
        data.message = '服务器应答异常';
        data.code = res.statusCode;
        cb(null,data)
      } else {
        if (chunks === "") {
          data.message = '服务器异常,拉取数据失败';
          data.code = res.statusCode;
          cb(null,data)
        } else {
          try {
            cb(null, JSON.parse(chunks));
          } catch (e) {
            data.message = '数据请求异常';
            data.code = res.statusCode;
            cb(null,data);
          }
        }
      }
    });
    res.on('error', function (e) {
      data.message = e.message;
      data.code = 404;
      cb(null,data);
    });
  });

  // 设置请求超时5秒
  req.setTimeout(5000);

  req.on('error',function(e) {
    if(req.res && req.res.abort && (typeof req.res.abort === 'function')) {
      req.res.abort();
    }
    req.abort();
    data.message = '服务器错误';
    data.code = 404;
    cb(null,data);

  }).on('timeout',function(e) {
    if(req.res && req.res.abort && (typeof req.res.abort === 'function')) {
      req.res.abort();
    }
    req.abort();
    data.message = 'request timeout';
    data.code = 404;
    cb(null,data);
  });

  req.write(bodyString);
  req.end();
}
