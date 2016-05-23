import Router from 'koa-router'
import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'

import { Navigation } from './components/navigation.jsx'
import { Home } from './components/home.jsx'

const ComponentsIndex = {
  'home': <Home />
}

const siteRouter = new Router()
const renderOption = (templateName, currentUrl, platformType, params) => {
  let p = params || {}
  // 把平台类型放到参数里面带给客户端
  _.merge(p,{'platformType':platformType})

  return {
    'title': '',
    'seoKeywords': '',
    'seoDescription': '',
    'reactMarkup': renderToString(ComponentsIndex[templateName]),
    'reactNavMarkup': renderToString(<Navigation />),
    'main': templateName,
    'params': JSON.stringify(p),
    'mode': (process.env.NODE_ENV === 'production') ? 'production' : 'development'
  }
}

/** this.platformClass 是通过前置的中间件设置 **/
siteRouter.get('/',function* (ctx, next) {
  yield this.render('modules/default',renderOption('home','/',this.platformType, this.request.query))
})

export { siteRouter }
