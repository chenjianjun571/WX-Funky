import Koa from 'koa'
import convert from 'koa-convert'
import ejsEngine from 'koa-ejs'
import Path from 'path'
import Favicon from 'koa-favicon'
import Logger from 'koa-logger'
import StaticFile from 'koa-static'
import thunkify from 'thunkify-wrap'
import _ from 'lodash'

import { siteRouter } from './routes'

import netMgr from './src/server/net/net-worker'
const NetWorker = netMgr.Instance()

const ReactServer = new Koa()

/**
初始化模板引擎 使用ejs作为页面引擎
可以在中间件中用this.render('templateName',jsonData)
来生成页面
api请查看 [http://www.embeddedjs.com/]
**/
ejsEngine(ReactServer, {
  root: Path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: true,
  debug: true
})

process.env.NODE_ENV === 'development' && ReactServer.use(Logger()) // 只有在NODE_ENV为development才加载日志
ReactServer.use(Favicon(__dirname + '/assets/images/favicon.png')) // favico
ReactServer.use(StaticFile('./assets',{'maxage':3*60*1000})) // 其他静态资源：js images css

let proxyFetcher = thunkify.genify(NetWorker.getData)
ReactServer.use(convert(function*(next){
  // 判断是不是api请求,是的话需要代理到后端处理
  if (this.request.url.startsWith('/api')) {
    let resData = {
      success: true,
      message: "",
      data: {},
      code: 200,
      count: 0
    }
    resData = yield* proxyFetcher(this.request.url,this.request.url)
    this.body = resData
  } else {
    if (this.request.header.host.indexOf('mt') === 0) {
      // 移动端
      this.platformType = 1
    } else {
      // PC端
      this.platformType = 0
    }

    yield next
  }
}))

// 静态页面路由
ReactServer.use(convert(siteRouter.routes()))

// 服务器异常处理
if (process.env.NODE_ENV === 'test') {
  module.exports = ReactServer.callback();
} else {
  ReactServer.listen(8001);
  console.log(process.env.NODE_ENV);
}

ReactServer.on('error', function (err) {
  console.log(err.stack)
})
