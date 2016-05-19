import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import { renderToString } from 'react-dom/server'


const siteRouter = new Router()

const renderOption = (templateName, currentUrl,platformClass,params,wrapperClass) => {
  let p = params || {}
  let platformType = 0;// 0:是pc 1:移动端
  if(platformClass === 'adaptation-mobile') {
    platformType = 1;
  }
  // 把平台类型放到参数里面带给客户端
  _.merge(p,{'platformType':platformType})
}

/** this.platformClass 是通过前置的中间件设置 **/
siteRouter.get('/',function* (next){
  if(this.platformClass === 'adaptation-mobile') {
    //yield this.render('modules/default',renderOption('home','/',this.platformClass, this.request.query, 'un'))
  } else {
    //yield this.render('modules/default',renderOption('home','/',this.platformClass))
  }
})

export { siteRouter }
