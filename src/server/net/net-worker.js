/**
 * Created by chenjianjun on 16/5/20.
 */
var http = require('http');
var Config = require("./../config.js");

var memTool = null;

//查询工具类
function NetWorker() {};

/*
  获取数据 GET
  @params
    url: 用于从缓存拿数据的key
    path:用于缓存未命中时的数据请求url
    cb: 回调
*/
NetWorker.prototype.getData = function(url, path, cb)
{
    var options = {
        host: Config.APIHost,
        port: Config.APIPort,
        path: path,
        method: "GET"
    };

    let data = {
        success:false,
        message:"",
        data:[],
        code:404,
        count:0
    };

    var req = http.request(options, function(res) {
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
                        var json = JSON.parse(chunks);
                        cb(null, json);
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

    req.end();
}

exports.Instance = function() {
    if (memTool == null) {
        memTool = new NetWorker();
    }
    return memTool;
}
