import Koa from 'koa'
import ejsEngine from 'koa-ejs'
import Path from 'path'
import Favicon from 'koa-favicon'
import Logger from 'koa-logger'
import StaticFile from 'koa-static'
import thunkify from 'thunkify-wrap'
import _ from 'lodash'

import { siteRouter } from './routes'

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

ReactServer.use(function*(next){
  // 如果域名是mt开头就是微信 this.platformClass 将会通过render变量被写到根div的class上
  if (this.request.header.host.indexOf('mt') === 0) {
    this.platformClass = 'adaptation-mobile'
  }else {
    this.platformClass = 'adaptation-1200'
  }
  yield next
})

// 静态页面路由
ReactServer.use(siteRouter.routes())

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
